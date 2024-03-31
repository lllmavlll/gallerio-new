import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-4">
      <Container>
        <hr className="my-4" />
        <p className="text-center">&copy; {new Date().getFullYear()} GalleRio. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer