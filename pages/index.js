import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";

import "bootstrap/dist/css/bootstrap.min.css";

import LandingPage from "./../components/landing/Index";
import Navbar from "../components/navbar";

import { rdb } from "../firebases";
import { ref, set } from "@firebase/database";
import HomePage from "../components/home/HomePage";

export default function Home({ Session }) {
  const [fact, setText] = useState("");

  console.log(Session);
  if (!Session) return <LandingPage />;
}
export async function getServerSideProps(context) {
  const Session = await getSession(context);
  if (Session) {
    return {
      redirect: {
        destination: "/paths",
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
