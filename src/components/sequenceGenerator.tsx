"use client"
import React from 'react'
import {Trick} from "../app/api/tricks/route"

type Props = {
  tricks: Trick[]
};
type State = {};

export default class SequenceGenerator extends React.Component<Props, State> {
  generateSequence = () => {
    const tricks = this.props.tricks;
    const sequence = [];
    for(let i = 0; i < 10; i++) {
      sequence.push(tricks[Math.floor(Math.random() * tricks.length)]);
    }
    console.log(sequence)
  }

  render() {
    return (
      <div>
        <button onClick={this.generateSequence}>Generate!</button>
      </div>
    )
  }
}
