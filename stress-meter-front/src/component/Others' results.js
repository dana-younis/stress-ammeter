import React, { Component } from 'react';
 import io from 'socket.io-client';
import { Button } from 'react-bootstrap';
const socket = io('localhost:5000/', { transports: ['websocket'] });
class others extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentName:'',
            counter: '',
            result:'',
        };
      }
      componentDidMount() {
       
        socket.on('connect', () => {
            socket.emit('counter', (payload) => {
                console.log(payload.studentName,payload.counter);
                this.counter = payload.counter;
                this.studentName = payload.studentName;
                socket.emit('result', {
                  counter: payload.counter,
                  studentName: payload.studentName,
                });
              });
          
          
        });
      }
    
  render() {
    return (
      <article className="ticket">
      <p>{this.state.studentName}</p>
        <h2>score:{this.state.counter}</h2>
        {/* <p>result:{props.result}</p>  */}

        <Button onClick={this.props.OthersResults} variant="danger">
          Delete Review
        </Button>
      </article>
    );
  }
}

export default others;
