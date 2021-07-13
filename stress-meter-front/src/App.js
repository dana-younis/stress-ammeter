


// import Header from './Components/header';
import Main from './component/Main';
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button'

import "react-bootstrap/dist/react-bootstrap.min.js";
import React from 'react'
import Card from './component/QCard';
let socket;

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      counter: 0

    };

  }

  yesFunction = () => {
    this.setState({ counter: this.state.counter + 1 });

  }
  emitCounters = () => {
    console.log("kkkkkkkk");
    const options = {
      transport: ['websocket'],
      upgrade: false,
    };
    socket = io('http://localhost:5000/', options);

    socket.emit("counter", { ...this.state });
    socket.on("result", (payload) => {
      console.log(payload);
      if (payload.counter >= 1 && payload.counter <= 6) {
        alert(`your score is ${payload.counter} and you have Few Hassles `)
      }
      else if(payload.counter >= 7 && payload<=12) {
        alert(`your score is ${payload.counter} and you have Pretty Good Control `)
      }
      else if(payload.counter >= 13 && payload.counter <=17) {
        alert(`your score is ${payload.counter} and you have Danger Zone. Watch out! `)
      }
      else if(payload.counter >= 18) {
        alert(`your score is ${payload.counter} and you have Stressed Out. Take steps to reduce the stress in your life now `)
      }
      else if(payload.counter === 0 ) {
        alert(`your score is ${payload.counter} you are cool `)
      }
      else {
        alert(`your score is ${payload.counter} please answer the questions `)
      }
    });
  }

  componentDidMount() {
    const options = {
      transport: ['websocket'],
      upgrade: false,
    };
    socket = io('http://localhost:5000/', options);

    socket.on("connection", socket => {
      console.log("hihi");
    });
  }
  render() {
    return (
      <div>
        {console.log(this.state.counter)}
        <Main />
        <Card yesFunction={this.yesFunction} />
        <Button variant="primary" onClick={this.emitCounters}>see the result </Button>
      </div>
    )
  }
}



