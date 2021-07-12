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
    };
  }
  componentDidMount() {
    const studentName = prompt("WHAT's your name?");
    this.setState({ studentName });
    socket.on('connect', () => {
      socket.on('claimed', function (payload) {
        alert(`${payload.name} claimed your ticket`);
      });
    });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     ...this.state,
     
  //   };
  //   console.log('hello', payload);
  //   // once the user submit the form we need to emit a ticket so all TAs can see that ticket

  //   // 1
  //   socket.emit('createTicket', payload);
  // };
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
              <button className="question" onClick={()=>{
                console.log('yes')
              }}>yes!</button>
            <button className="question" onClick={()=>{
                console.log('no')
              }}>no!</button>
          </form>
        </section>
      </main>
    );
  }
}

export default Home;
