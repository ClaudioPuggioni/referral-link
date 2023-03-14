import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../db-config";
import ReactGA from "..";

let myTimeout;
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 17);
const config = {
  dictionaries: [starWars],
};

export default function App() {
  const [myLink, setMyLink] = useState("");
  const [popup, setPopup] = useState(false);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Landing/Create Referral Link Page" });
  }, []);

  const handleClick = () => {
    clearTimeout(myTimeout);
    const newName = uniqueNamesGenerator(config);
    const refID = nanoid();
    const newLink = `http://${window.location.hostname}:${window.location.port}/${refID}`;
    setPopup(true);
    setMyName(newName);
    setMyLink(newLink);
    navigator.clipboard.writeText(newLink);

    writeToDB(newName, refID);

    myTimeout = setTimeout(() => {
      setPopup(false);
    }, 2000);
  };

  const writeToDB = async (newName, refID) => {
    await setDoc(doc(db, "users", newName), {
      username: newName,
      link: refID,
      referred: [],
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-300 gap-2">
      <div>{myName}</div>
      <div className="relative flex items-center">
        <button className="px-4 py-2 rounded-3xl bg-slate-600 text-white z-50" onClick={handleClick}>
          Get referral link
        </button>
        <div
          className="absolute transition-all px-2 py-1 rounded-2xl bg-amber-500 text-amber-900"
          style={{ opacity: !popup ? "0" : "100%", right: !popup ? "0" : "-80px" }}
        >
          Copied!
        </div>
      </div>
      <div className="h-1">
        {myLink.length > 0 ? <input className="py-1.5 pl-4 rounded w-[390px]" type="text" value={myLink} readOnly></input> : null}
      </div>
    </div>
  );
}
