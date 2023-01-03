import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../db-config";

export default function SignedUp() {
  const { referrer } = useParams();
  const [objString, setObjString] = useState("");

  useEffect(() => {
    findUserDB();
    // eslint-disable-next-line
  }, []);

  const findUserDB = async () => {
    const userRef = doc(db, "users", referrer);

    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setObjString(JSON.stringify(docSnap.data().referred));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-300 gap-2">
      <div>Sign up success!</div>
      <div>{objString.length > 0 ? objString : null}</div>
    </div>
  );
}
