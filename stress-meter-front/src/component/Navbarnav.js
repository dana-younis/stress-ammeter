
import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

export default class Navbarnav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top" className="Navbar">
        <Container>
          <Navbar.Brand href="/">Stress meter</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="https://www.youtube.com/watch?v=pkL9YHoTiYM">calm music</Nav.Link>
            <Nav.Link href="/users">profile</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    )
  }
}
