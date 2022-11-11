import React, { useRef } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import CreatePathPopUpStyles from "./CreatePathPopUp.module.css";

import { db } from "../../firebases";
import { doc, setDoc } from "firebase/firestore";

import { Modal } from "reactstrap";
import { useDispatch } from "react-redux";
import { Updates } from "../../action";

function CreatePathPopUp({ isOpen, toggleFun, Session }) {
  const Textref = useRef(null);
  const Textref2 = useRef(null);
  const dispatch = useDispatch();
  const AddDataToFirebase = (e) => {
    e.preventDefault();
    toggleFun();
    setDoc(
      doc(
        db,
        "store",
        `${Session.user.email.split("@")[0]}-${Textref.current.value}`
      ),
      {
        name: Session.user.name,
        email: Session.user.email.split("@")[0],
        Title: Textref.current.value,
        image: Textref2.current.value,
      }
    ).then(() => {
      dispatch(Updates());
    });
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleFun}
      centered={true}
      className={CreatePathPopUpStyles.create_path_popup_primary_wrapper}
    >
      <div
        className={CreatePathPopUpStyles.create_path_popup_secondary_wrapper}
      >
        <div className={CreatePathPopUpStyles.create_path_popup_title}>
          Create a new store
        </div>
        <form
          onSubmit={(e) => AddDataToFirebase(e)}
          className={CreatePathPopUpStyles.create_path_form_wrapper}
        >
          <input
            type="text"
            placeholder="Store Name"
            ref={Textref}
            className={CreatePathPopUpStyles.create_path_popup_input}
          />
          <input
            type="text"
            placeholder="Image URL"
            ref={Textref2}
            className={CreatePathPopUpStyles.create_path_popup_input}
          />
          <button
            type="submit"
            className={CreatePathPopUpStyles.create_path_popup_submit_button}
          >
            Add
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreatePathPopUp;
