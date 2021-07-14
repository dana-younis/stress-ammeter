// import React from 'react'




// import io from 'socket.io-client';
// let socket;
// const options = {
//   transport: ['websocket'],
//   upgrade: false,
// };
// socket = io('http://localhost:5000/', options);



// export default class User extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userName: "",
//       tickets: [],
//       onlineuser: [],
//     }
//   }
//   componentDidMount() {
//     // run once when component is mounted
//     console.log(this.state.userName)

//     socket.on('connect', () => {
//       //1a
//       socket.emit('join', { name: this.state.userName });

//       socket.on('onlineUser', (payload) => {
//         console.log("onlineUser", payload);
//         console.log({ ...this.state.onlineUser })
//         this.setState({ onlineUser: [...this.state.onlineUser, payload] });
//       });
//       socket.on('offlineUser', (payload) => {
//         console.log("offlineUser", payload);

//       });
//     });
//   }

//   render() {


//     return (
//       <div>

//       </div>
//     )
//   }
// }

import React from 'react';


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffName: '',
      tickets: [],
      onlineStaff: [],
    };

  }
  componentDidMount() {
    // run once when component is mounted
    const staffName = prompt("WHAT's your name?");
    this.setState({ staffName });
    console.log("sososo", this.props.socket);
    this.props.socket.on('connect', () => {
      //1a
      this.props.socket.emit('join', { name: staffName });
      this.props.socket.emit('getAll');
      this.props.socket.on('newTicket', (payload) => {
        this.setState({ tickets: [...this.state.tickets, payload] });
      });
      this.props.socket.on('onlineStaff', (payload) => {
        this.setState({ onlineStaff: [...this.state.onlineStaff, payload] });
      });
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
      name: this.state.staffName,
      studentId: socketId,
    });
  };
  render() {
    return (
      <main className="admin-container">
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

export default Admin;
