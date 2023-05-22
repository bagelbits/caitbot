"use client";
import React, { useState } from "react";
import TrickModal from "./trickModal";
import { TrickResource } from "../app/api/tricks/route";

type SequenceProps = {
  sequence: TrickResource[];
};

const TrickSequence = (props: SequenceProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trickModalId, setTrickModalId] = useState("");
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

      <ul role="list" className="mx-auto max-w-md bg-white p-2 shadow">
        {props.sequence.map((trick, index) => (
          <li
            key={index}
            className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100"
          >
            <a href="#" onClick={() => openTrickModal(trick.id)}>
              <span
                className="absolute inset-0 rounded-xl"
                aria-hidden="true"
              ></span>
              {trick.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrickSequence;
