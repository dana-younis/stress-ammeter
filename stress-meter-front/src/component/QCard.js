import React from 'react'


import { Card, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
// import CardColumns from 'react-bootstrap/CardColumns'
// import cardsStyle from '../cardsStyle.css'
import '../cardsStyle.css'

let questions = [' Do you frequently neglect your diet?', 'Do you frequently try to do everything yourself?', 'Do you blow up easily and often?', 'Do you frequently seek unrealistic goals?', 'Do you find it difficult to enjoy humor and entertainment?', 'Do you frequently and easily get irritated?', 'Do you frequently seem to make a "big deal" of everything?', 'Do you frequently complain that you are disorganized?', 'Do you tend to keep everything inside?', 'Do you frequently neglect exercise?', 'Do you have few supportive relationships?', 'Do you often get too little rest?', 'Do you frequently get angry when you are kept waiting?', ' Do you often ignore symptoms of poor health?', 'Do you frequently put things off until later?', ' Do you frequently think there is only one right way to do something?', 'Do you have an absence of enjoyable activities in your life?', 'Do you frequently find yourself spending a lot of time complaining about the past?', '. Do you wake up feeling anxious about going to work?', 'Do you often feel unable to cope with all you have to do?', 'Do you care for an elderly or ill relative?']
export default class QCard extends React.Component {


  render() {
    return (
      <Row xs={1} md={2} className="g-4" style={{ margin: '2rem' }}>
        {
          questions.map((qu, idx) => {
            return <Card border="info" style={{ width: '18rem' }} id={idx} key={idx}>
              <Card.Body style={{ width: '18rem' }}>
                <Card.Title style={{ width: '18rem' }}>{`Question ${idx + 1}`}</Card.Title>
                <Card.Text style={{ width: '30rem' }}>
                  {`${qu} `}
                </Card.Text>
                <Button variant="primary" onClick={this.props.yesFunction} style={{ marginRight: '5rem', margin: '.2rem', width: '6rem' }}> yes </Button>
                <Button variant="primary" style={{ margin: '.2rem', width: '6rem' }}>no</Button>
              </Card.Body>
            </Card>
          })

        }
      </Row>
    )
  }
}
