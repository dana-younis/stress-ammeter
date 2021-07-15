

import React from 'react';
import { Card, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import '../cardsStyle.css'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      onlineUser: [],
      counter: ""


    };


  }
  componentDidMount() {
    // run once when component is mounted
    console.log("..", this.props)


    console.log("sososo", this.props.socket);
    this.props.socket.on('connect', () => {

      //{ counter: payload.counter, studentName: payload.studentName }


      this.props.socket.emit('join', { ...this.state });

      this.props.socket.emit('getAll');

      this.props.socket.on('onlineUser', (payload) => {
        console.log("online", payload);
        // this.state.onlineUser.push(payload)
        console.log(this.state.onlineUser);
        this.setState({ studentName: payload.studentName, counter: payload.counter });
        // this.setState({ studentName: payload.studentName, id: payload.id })
      });

      //1a
      ;
      ;
      this.props.socket.on('offlineUser', (payload) => {
        console.log('HELLO?', payload);
        this.setState({
          onlineUser: this.state.onlineUser.filter((user) => user.id !== payload.id),
        });
      });



    });
  }

  render() {
    return (
      <>
        <Row xs={1} md={2} className="g-4" style={{ margin: '2rem' }}>
          {

            <Card border="info" style={{ width: '18rem' }} >
              <Card.Body style={{ width: '18rem' }}>
                <Card.Title style={{ width: '18rem' }}> your name :{`${this.state.studentName} `}</Card.Title>
                <Card.Text style={{ width: '30rem' }}>
                  stress score :{`${this.state.counter} `}
                </Card.Text>

                {(this.state.counter > 0 && this.state.counter <= 6) && <div>you have Few Hassles</div>}
                {(this.state.counter > 6 && this.state.counter <= 12) && <div>you have Pretty Good Control</div>}
                {(this.state.counter > 12 && this.state.counter <= 17) && <div>you have Danger Zone. Watch out!</div>}
                {(this.state.counter > 17 && this.state.counter <= 22) && <div>you have Stressed Out. Take steps to reduce the stress in your life now</div>}
                {this.state.counter === 0 && <div>you are cool</div>}


              </Card.Body>
            </Card>


          }
        </Row>

      </>
    );
  }
}

export default User;
