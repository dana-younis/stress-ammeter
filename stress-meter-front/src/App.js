// import Header from './Components/header';
// import Main from './component/Main';

import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from './component/QCard';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      studentName: '',

    };
  }

  yesFunction = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  emitCounters = () => {
    console.log('kkkkkkkk');


    this.props.socket.emit('counter', { ...this.state });
    this.props.socket.on('result', (payload) => {
      console.log(payload);
      // this.props.socket.emit('user', { ...this.state });
      if (payload.counter >= 1 && payload.counter <= 6) {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} and you have Few Hassles `
        );
      } else if (payload.counter > 6 && payload.counter <= 12) {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} and you have Pretty Good Control `
        );
      } else if (payload.counter > 12 && payload.counter <= 17) {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} and you have Danger Zone. Watch out! `
        );
      } else if (payload.counter > 17 && payload.counter <= 22) {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} and you have Stressed Out. Take steps to reduce the stress in your life now `
        );
      } else if (payload.counter === 0) {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} you are cool `
        );
      } else {
        alert(
          `Hello ${payload.studentName}  your score is ${payload.counter} please answer the questions `
        );
      }
    });
  };

  componentDidMount() {
    const studentName = prompt("WHAT's your name?");
    this.setState({ studentName });


    this.props.socket.on('connection', (socket) => {
      console.log('hihi');
      this.setState({ id: socket.id })
    });
    this.props.socket.emit("student", { studentName: studentName })
  }

  render() {
    return (


      <>
        <Card yesFunction={this.yesFunction} />
        <Button
          variant="primary"
          onClick={this.emitCounters}
          style={{ marginLeft: '416px', width: '527px' }}
        >
          see the result
        </Button>

      </>




    );
  }
}

//style={{width: "527px",margin-left: "416px"}
