"use client";
import React, { useState } from "react";
import TrickSequence from "./trickSequence";
import { TrickResource } from "../app/api/tricks/route";

type Props = {
  tricks: TrickResource[];
};

const SequenceGenerator = (props: Props) => {
  const [sequence, setSequence] = useState<TrickResource[]>([]);
  const [showSequence, setShowSequence] = useState(false);

  function generateSequence() {
    const tricks = props.tricks;
    const newSequence = [];
    for (let i = 0; i < 10; i++) {
      newSequence.push(tricks[Math.floor(Math.random() * tricks.length)]);
    }
    setSequence(newSequence);
    setShowSequence(true);
  }

  return (
    <div>
      <div className="mx-auto my-10 flex w-1/2 p-4 shadow">
        <a
          href="#"
          className="rounded-full bg-emerald-500 px-5 py-2 font-semibold leading-5 text-white hover:bg-emerald-700"
          onClick={generateSequence}
        >
          Generate!
        </a>
      </div>
      {showSequence ? <TrickSequence sequence={sequence} /> : null}
    </div>
  );
};

export default SequenceGenerator;
