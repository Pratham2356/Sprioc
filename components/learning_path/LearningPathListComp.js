import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Card, CardHeader, Modal } from "reactstrap";

import deleteButton from "../../assets/paths/delete.svg";
import leaveButton from "../../assets/paths/leave.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import LearningPathListCompStyles from "./LearningPathListComp.module.css";

import { Updates } from "../../action";

import { deleteDoc, doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../../firebases";
import router from "next/router";

import ReactStars from "react-rating-stars-component";

function LearningPathListComp({
  title,
  pathsData,
  isOwner,
  onButtonClick,
  Session,
}) {
  const dispatch = useDispatch();
  const [data, setData] = useState(pathsData);
  console.log(pathsData);
  return (
    <div className={LearningPathListCompStyles.l_l_primary_wrapper}>
      <h4 className={LearningPathListCompStyles.l_l_title}>{title}</h4>
      <div className={LearningPathListCompStyles.l_l_list_wrapper}>
        {pathsData?.map((cardData, index) => {
          return (
            <Link href={`/p/${cardData.email}-${cardData.Title}`}>
              <div
                className={LearningPathListCompStyles.l_l_list_item}
                key={index}
                style={{
                  borderBottom:
                    index === pathsData.length - 1
                      ? "none"
                      : "1px solid #e6e6e6",
                }}
              >
                <div className={LearningPathListCompStyles.l_l_list_item_img}>
                  <Image
                    src={
                      "https://res.cloudinary.com/demo/image/fetch/" +
                      cardData.image
                    }
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className={LearningPathListCompStyles.l_l_list_item_title}>
                  {cardData.Title}
                  <ReactStars
                    value={
                      cardData.reviews && cardData.reviews.length
                        ? cardData.reviews.reduce(
                            (a, b) => a + (b.rating || 0),
                            0
                          ) / cardData.reviews.length
                        : 0
                    }
                    edit={false}
                    size={20}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default LearningPathListComp;
