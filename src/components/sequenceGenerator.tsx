"use client";
import React, { useState } from "react";
import TrickModal from "./trickModal";
import { TrickResource } from "../app/api/tricks/route";
import { Trick } from "../app/api/tricks/[id]/route";

type Props = {
  tricks: TrickResource[];
};

const SequenceGenerator = (props: Props) => {
  const [sequence, setSequence] = useState<TrickResource[]>([]);
  const [tricks, setTricks] = useState<Trick[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trickModalId, setTrickModalId] = useState("");

  function generateSequence() {
    const tricks = props.tricks;
    const newSequence = [];
    for (let i = 0; i < 10; i++) {
      newSequence.push(tricks[Math.floor(Math.random() * tricks.length)]);
    }
    setSequence(newSequence);
  }

  const openTrickModal = (trickId: string) => {
    setTrickModalId(trickId);
    setModalIsOpen(true);
  };
  const closeTrickModal = () => {
    setTrickModalId("");
    setModalIsOpen(false);
  };

  return (
    <div>
      <TrickModal
        open={modalIsOpen}
        trickId={trickModalId}
        onClose={closeTrickModal}
      />
      <button
        className="bg-emerald-500 hover:bg-emerald-700"
        onClick={generateSequence}
      >
        Generate!
      </button>
      <ul role="list" className="divide-y divide-slate-200 p-10">
        {sequence.map((trick, index) => (
          <li key={index} className="flex py-4 first:pt-0 last:pb-0">
            <button onClick={() => openTrickModal(trick.id)}>
              {trick.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SequenceGenerator;
