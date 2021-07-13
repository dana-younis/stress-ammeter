import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
export default class Navbarnav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Stress meter</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">calm music</Nav.Link>
            <Nav.Link href="#pricing">email</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}
