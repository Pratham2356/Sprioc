import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import QuestionPageStyles from "./QuestionPage.module.css";

import PrimaryNavbar from "../navbar/Navbar";
import { db } from "../../firebases";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useDispatch } from "react-redux";
import { Updates } from "../../action";
import { set } from "@firebase/database";
import ReactStars from "react-rating-stars-component";

function QuestionPage({ Session, storeData, query }) {
  const [reviewsList, setAnswer] = useState(storeData.reviews || []);
  useEffect(() => {
    console.log(storeData);
  }, [storeData]);
  const [reviewStars, setReviewStars] = useState(5);

  const dispatch = useDispatch();
  const TextRef = useRef();

  return (
    <div className={QuestionPageStyles.q_p_primary_wrapper}>
      <PrimaryNavbar userDetails={Session.user} />
      <div className={QuestionPageStyles.q_p_question_details_wrapper}>
        <div className={QuestionPageStyles.q_p_author_details_image}>
          <Image
            src={
              "https://res.cloudinary.com/demo/image/fetch/" + storeData.image
            }
            height={"100%"}
            width={"100%"}
            layout="fill"
          />
        </div>
        <div>
          <h3 className={QuestionPageStyles.q_p_question_details_title}>
            {storeData.Title}
          </h3>
          <ReactStars
            value={
              storeData.reviews && storeData.reviews.length
                ? storeData.reviews.reduce((a, b) => a + (b.rating || 0), 0) /
                  storeData.reviews.length
                : 0
            }
            edit={false}
            size={30}
          />
        </div>
      </div>
      <form
        className={QuestionPageStyles.q_p_add_answer_wrapper}
        onSubmit={(e) => {
          e.preventDefault();
          getDoc(doc(db, "store", query)).then((snap) => {
            // filter items without rating
            const reviews =
              snap.data().reviews.filter((item) => item.rating) || [];
            reviews.push({
              answer: TextRef.current.value,
              author: Session.user.name,
              image: Session.user.image,
              rating: reviewStars,
            });

            setDoc(
              doc(db, "store", query),
              {
                reviews,
              },
              { merge: true }
            ).then(() => {
              TextRef.current.value = "";
              setAnswer(reviews);
              dispatch(Updates());
            });
          });
        }}
      >
        <ReactStars
          value={reviewStars}
          size={40}
          onChange={(newRating) => {
            setReviewStars(newRating);
          }}
        />
        <textarea
          required
          type="text"
          name="review"
          ref={TextRef}
          placeholder="Add your review.."
          className={QuestionPageStyles.q_p_add_answer_input}
        />
        <button
          type="submit"
          className={QuestionPageStyles.q_p_add_answer_submit_button}
        >
          Add Review
        </button>
      </form>
      <div className={QuestionPageStyles.q_p_answers_wrapper}>
        {reviewsList?.map((reviewItem, index) => (
          <div key={index} className={QuestionPageStyles.q_p_answer_wrapper}>
            <div className={QuestionPageStyles.q_p_answering_user_details}>
              <div className={QuestionPageStyles.q_p_answering_user_image}>
                {reviewItem.image && (
                  <Image
                    src={reviewItem.image}
                    height={"100%"}
                    width={"100%"}
                    layout="responsive"
                  />
                )}
              </div>
              <h4 className={QuestionPageStyles.q_p_answering_user_name}>
                {reviewItem.author}
              </h4>
              <ReactStars
                value={reviewItem.rating || 0}
                edit={false}
                size={20}
              />
            </div>
            <p className={QuestionPageStyles.q_p_answer_text}>
              {reviewItem.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionPage;
