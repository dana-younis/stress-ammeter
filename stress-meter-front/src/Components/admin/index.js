import React from 'react';
import Ticket from './ticket';
import './admin.css';
import io from 'socket.io-client';
const socket = io('localhost:5000/', { transports: ['websocket'] });
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      tickets: [],
      onlineStaff: [],
      counter: 0

    };
  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("WHAT's your name ta ?");
    const score = this.state.counter
    this.setState({ staffName });
    socket.on('connect', () => {
      //1a
      socket.emit('join', { name: staffName, score: score });
      socket.on('newTicket', (payload) => {
        this.setState({ tickets: [...this.state.tickets, payload], });
      });
      socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload], });
      });
      socket.on('offlineStaff', (payload) => {
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });
    });
  }
  handleClaim = (id, socketId, counter, studentName) => {
    console.log(socketId);
    console.log(counter);
    this.setState({ counter: counter })

    socket.emit('claim', { id, name: { studentName: studentName, score: counter }, studentId: socketId, score: this.state.counter });
  };
  render() {
    return (
      <main className="admin-container">
        <section id="container">
          <h2>Opened Tickets</h2>
          <section id="tickets">
            {this.state.tickets.map((ticket) => {
              return (
                <Ticket {...ticket} handleClaim={this.handleClaim} key={ticket.id} />
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2>Available TAs</h2>
          {this.state.onlineStaff.map((staff) => (
            <h2 key={staff.id}> {staff.name}</h2>
          ))}
        </aside>
      </main>
    );
  }
}

export default Admin;
