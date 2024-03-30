import React from 'react'
import { Button, Container, NavDropdown, Navbar } from 'react-bootstrap'
import { UserAuth } from '../../../auth/JWTAuthContext'

const Header = () => {
  const { user } = UserAuth()
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">GalleRio</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {
              user ?
                <>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Logout?
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                : <Button variant='primary'>Login</Button>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header