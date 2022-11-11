import { getSession, useSession } from "next-auth/react";
import AddButton from "../components/AddButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import { rdb, db } from "../firebases";
import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  QuerySnapshot,
  where,
} from "@firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { query } from "@firebase/database";
import { useSelector } from "react-redux";
import LearningPathsPage from "../components/learning_path/index";
import { ref, set } from "@firebase/database";

function Paths({ Session }) {
  set(ref(rdb, "user/" + Session.user.email.split("@")[0]), {
    username: Session.user.name,
    image: Session.user.image,
  });

  const [Paths, setData] = useState([]);
  let path = [];
  const UpdateState = useSelector((state) => state.update);

  useEffect(() => {
    const q = getDocs(collection(db, "store"))
      .then((querySnapshot) => {
        querySnapshot.forEach((Data) => path.push(Data.data()));
      })
      .then(() => {
        setData(path);
      });
  }, [UpdateState]);

  useEffect(() => {}, [Paths]);
  return (
    <div>
      {Session && <LearningPathsPage Session={Session} pathsData={Paths} />}
    </div>
  );
}

export default Paths;
export async function getServerSideProps(context) {
  const Session = await getSession(context);
  if (!Session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      Session,
    },
  };
}
