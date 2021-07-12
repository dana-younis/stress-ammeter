import React from 'react';
import './home.css';
import io from 'socket.io-client';

const SERVER_URL = process.env.SERVER_URL || 'localhost:5000/';
const socket = io(SERVER_URL, { transports: ['websocket'] });

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      yesNo: 'hello',
      counter: 0
    };
  }
  //   Scores of 1‐6 ‐ Few Hassles
  // Scores of 7‐12 ‐ Pretty Good Control
  // Scores of 13‐17 ‐Danger Zone. Watch out!
  // Scores of 18+ ‐ Stressed Out. Take steps to reduce the stress in your life now.
  componentDidMount() {
    // const c=this.state.counter
    const studentName = prompt("WHAT's your name student?");
    this.setState({ studentName });

    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        console.log(payload);
        if (Number(payload.name.score) <= 6) {
          alert(`your score is ${payload.name.score} and you have Few Hassles`);
        }

      });
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
    console.log('hello', payload);
    // once the user submit the form we need to emit a ticket so all TAs can see that ticket

    // 1
    socket.emit('createTicket', payload);
  };
  render() {
    return (

      <main className="container">

        <section className="form-card">
          <form id="questions-form" onSubmit={this.handleSubmit}>
            <div className="question"
              type="text"
              name="question"
            >
              1. Do you frequently neglect your diet?
            </div>
            <button className="question" onClick={() => {
              this.state.counter++
              console.log('yes')
              this.setState({ yesNo: 'yes' })
              console.log(this.state.counter);
            }}>yes!</button>
            <button className="question" onClick={() => {
              console.log('no')
              this.setState({ yesNo: 'NO' })
            }}>no!</button>
          </form>
        </section>

      </main>
    );
  }
}

export default Home;
