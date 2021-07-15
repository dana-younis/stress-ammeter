

import React from 'react';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: this.props.studentName,
      tickets: [],
      onlineStaff: [],

    };


  }
  componentDidMount() {
    // run once when component is mounted
    console.log(this.props)


    console.log("sososo", this.props.socket);
    this.props.socket.on('connect', () => {
      console.log("getdata", this.state.studentName);

      //{ counter: payload.counter, studentName: payload.studentName }


      this.props.socket.emit('join', { ...this.state });

      this.props.socket.emit('getAll');
      this.props.socket.on('newTicket', (payload) => {
        this.setState({ tickets: [...this.state.tickets, payload] });
      });
      this.props.socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
      });

      //1a

      this.props.socket.on('offlineStaff', (payload) => {
        console.log('HELLO?', payload);
        this.setState({
          onlineStaff: this.state.onlineStaff.filter((staff) => staff.id !== payload.id),
        });
      });
    });
  }
  handleClaim = (id, socketId) => {
    console.log(socketId);
    this.props.socket.emit('claim', {
      id,
      name: this.state.studentName,
      studentId: socketId,
    });
  };
  render() {
    return (
      <main className="User-container">
        <section id="container">
          <h2>Opened Tickets</h2>
          <section id="tickets">
            {this.state.tickets.map((ticket) => {
              return (
                <div >hiiii</div>
              );
            })}
          </section>
        </section>
        <aside id="online-staff">
          <h2>Available TAs</h2>
          {this.state.onlineStaff.map((staff) => (
            <h2 key={staff.id}>{staff.name}</h2>
          ))}
        </aside>
      </main>
    );
  }
}

export default User;
