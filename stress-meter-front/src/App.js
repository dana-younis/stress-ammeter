// import Header from './Components/header';
// import Main from './component/Main';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Card from './component/QCard';
import Navbarnav from './component/Navbarnav';
let socket;

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
    const options = {
      transport: ['websocket'],
      upgrade: false,
    };
    socket = io('http://localhost:5000/', options);

    socket.emit('counter', { ...this.state });
    socket.on('result', (payload) => {
      console.log(payload);

      if (payload.counter >= 1 && payload.counter <= 6) {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} and you have Few Hassles `
        );
      } else if (payload.counter > 6 && payload.counter <= 12) {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} and you have Pretty Good Control `
        );
      } else if (payload.counter > 12 && payload.counter <= 17) {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} and you have Danger Zone. Watch out! `
        );
      } else if (payload.counter > 17 && payload.counter <= 22) {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} and you have Stressed Out. Take steps to reduce the stress in your life now `
        );
      } else if (payload.counter === 0) {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} you are cool `
        );
      } else {
        alert(
          `Hello ${this.state.studentName}  your score is ${payload.counter} please answer the questions `
        );
      }
    });
  };

  componentDidMount() {
    const studentName = prompt("WHAT's your name?");
    this.setState({ studentName });
    const options = {
      transport: ['websocket'],
      upgrade: false,
    };
    socket = io('http://localhost:5000/', options);

    socket.on('connection', (socket) => {
      console.log('hihi');
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...this.state,
    };
    console.log(payload);
  };
  render() {
    return (
      <div>
        {console.log(this.state.counter)}
        <Navbarnav />
        <Card yesFunction={this.yesFunction} />
        <Button
          variant="primary"
          onClick={this.emitCounters}
          style={{ marginLeft: '416px', width: '527px' }}
        >
          see the result{' '}
        </Button>
      </div>
    );
  }
}

//style={{width: "527px",margin-left: "416px"}
