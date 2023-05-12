"use client"
import React from 'react'
import {TrickResource} from "../app/api/tricks/route"
import {Trick} from "../app/api/tricks/[id]/route"

type Props = {
  tricks: TrickResource[]
};
type State = {
  sequence: TrickResource[]
  tricks: Trick[]
};

export default class SequenceGenerator extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sequence: [],
      tricks: []
    }
  }

  generateSequence = () => {
    const tricks = this.props.tricks;
    const sequence = [];
    for(let i = 0; i < 10; i++) {
      sequence.push(tricks[Math.floor(Math.random() * tricks.length)]);
    }
    this.setState({sequence: sequence})
  }

  render() {
    const sequenceList = this.state.sequence.map((trick, index) => {return <div key={index}><a href={trick.id}>{trick.name}</a></div>;});
    console.log(sequenceList);
    return (
      <div>
        <button onClick={this.generateSequence}>Generate!</button>
        {sequenceList}
      </div>
    )
  }
}
