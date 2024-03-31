import React from 'react'
import { Button, Container, NavDropdown, Navbar } from 'react-bootstrap'
import { UserAuth } from '../../../auth/JWTAuthContext'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

const Header = () => {
  const navigate = useNavigate()

  const { logout } = UserAuth()

  const LoginToggle = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  const logOutUser = async (e) => {
    e.preventDefault()

    const loadingToast = toast.loading('Loadin...!')
    try {
      await logout()
      toast.success('logged out succesfully')
      toast.dismiss(loadingToast)

    } catch (error) {
      toast.error(String(error.code).split("/")[1].replaceAll("-", " "))
      toast.dismiss(loadingToast)

    }

  }

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
                  <NavDropdown className='text-primary' title={user.email} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={e => logOutUser(e)}>
                      Logout?
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
                : <Button onClick={e => LoginToggle(e)} variant='primary'>Login</Button>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      <Toaster richColors position='bottom-right' />
    </Navbar>

  )
}

export default Header