import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import  { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header>
           <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
              <Container>
                <LinkContainer to='/'>
                   <Navbar.Brand>ProShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                             <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown 
                                  title={userInfo.name}
                                  id='username'>
                                      <a href={'/profile'} className='dropdown-item'>
                                          Profile
                                      </a>
                                      <NavDropdown.Item onClick={logoutHandler}>
                                          Logout
                                      </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                               <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown 
                            title='Admin'
                            id='adminmenu'>
                                <a href={'/admin/userlist'} className='dropdown-item'>
                                    Users
                                </a>
                                <a href={'/admin/productlist'} className='dropdown-item'>
                                    Products
                                </a>
                                <a href={'/admin/orderlist'} className='dropdown-item'>
                                    Orders
                                </a>
                             
                            </NavDropdown>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
    )
}

export default Header

