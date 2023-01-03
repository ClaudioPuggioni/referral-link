import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let myInterval;
export default function Page404() {
  const [count, setCount] = useState(5);
  const goTo = useNavigate();

  useEffect(() => {
    handleCount();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (count <= 0) {
      clearInterval(myInterval);
      goTo("/");
    }
    // eslint-disable-next-line
  }, [count]);

  const handleCount = () => {
    myInterval = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-slate-300 gap-2">
      <div className="text-[150px] font-semibold">404</div>
      <div className="text-[35px]">Ooops, page not found</div>
      <div className="mt-7 text-[18px]">Sorry, but the requested page does not exist.</div>
      <div>Redirecting in {count}...</div>
    </div>
  );
}
