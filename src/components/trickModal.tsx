"use client";
import { useState } from "react";
import ReactModal from "react-modal";
import useSWR from "swr";
import { Trick } from "../app/api/tricks/[id]/route";
import fetcher from "../lib/fetcher";

type Props = {
  trickId: string;
  open: boolean;
  onClose: Function;
};

const TrickModal = (props: Props) => {
  const { data, error, isLoading } = useSWR<Trick, Error>(
    `/api/tricks/${props.trickId}`,
    fetcher
  );

  if (error) {
    return (
      <ReactModal isOpen={props.open}>
        <div>failed to load</div>
        <button onClick={() => props.onClose()}>close</button>
      </ReactModal>
    );
  }
  if (isLoading || !data) {
    return (
      <ReactModal isOpen={props.open}>
        <div>loading...</div>
        <button onClick={() => props.onClose()}>close</button>
      </ReactModal>
    );
  }
  return (
    <ReactModal isOpen={props.open}>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      {data.youtubeId ? (
        <iframe
          className="video"
          title="Youtube player"
          sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
          src={`https://youtube.com/embed/${data.youtubeId}?autoplay=0`}
        ></iframe>
      ) : null}
      <button onClick={() => props.onClose()}>close</button>
    </ReactModal>
  );
};

export default TrickModal;
