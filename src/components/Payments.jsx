import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactGA from "..";
import { db } from "../db-config";

export default function Payments() {
  const { referral } = useParams();
  const [referrerName, setReferrerName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const goTo = useNavigate();

  useEffect(() => {
    console.log(referral);
    findUserDB(referral);

    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Sign Up Page" });
    // eslint-disable-next-line
  }, []);

  const findUserDB = async (refID) => {
    const usersRef = collection(db, "users");
    const queryUser = query(usersRef, where("link", "==", refID));

    const querySnapshot = await getDocs(queryUser);

    if (querySnapshot.empty) {
      return goTo("/404");
    } else {
      console.log("User found");
    }

    querySnapshot.forEach(async (receivedDocument) => {
      const data = receivedDocument.data();

      console.log("DATA IS:", data);
      setReferrerName(data.username);
    });
  };

  const handleSignup = async () => {
    if (newUsername.length === 0) return;

    ReactGA.event({
      category: `${newUsername} signed up to ${referrerName}`,
      action: "Clicked Sign Up Button",
      value: true,
    });

    const userRef = doc(db, "users", referrerName);
    await updateDoc(userRef, {
      referred: arrayUnion(newUsername),
    });

    goTo(`/success/${referrerName}`);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-300 gap-2">
      <div className="text-[19px]">{referrerName ? `${referrerName} has referred you to this site.` : null}</div>
      <div className="font-semibold text-[17px]">Sign up with 20% discount!</div>

      <div>Enter name:</div>
      <input className="py-1.5 pl-4 rounded" type="text" onChange={(e) => setNewUsername(e.target.value)} />

      <button className="flex justify-center items-center px-4 py-2 rounded-3xl bg-slate-600 text-white z-50" onClick={handleSignup}>
        Sign up!
      </button>
    </div>
  );
}
