import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authState, logout as logoutHandle } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Firebase';
import "../Style/Header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import { favoriteMovies, searchMovie } from '../redux/movies/moviesSlice';

export default function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(authState)
  const favorite = useSelector(favoriteMovies)

  const handleLogout = async () => {
    await logout()
    dispatch(logoutHandle())
    navigate("login", {
      replace: true
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
   
      {user ? <Navbar className='nav' expand="lg">
        <Container>
          <Navbar.Brand className='navbar-brand'>Best Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <ul >
                {user ? <NavLink className="user-link" id='home'
                  to={"/"}>Ana sayfa</NavLink> : null}
                <li>{user ? "" :
                  <NavLink className="user-link" to={"/sign"}>Kayıt Ol</NavLink>}
                </li>
                <li> {user ?
                  <div className='user-name mt-2'>{user.displayName || user.email} </div> :
                  <NavLink className="user-link" to={"/login"}>Giriş Yap</NavLink>}
                </li>
                <li>
                  {user.photoURL ?
                    <img className='image' src={user.photoURL}
                      alt={user.displayName} /> : null}
                </li>
                <li>
                  {user ?
                    <div className='mt-2'>
                      <NavLink className='buttons' to={`/favorite`}>
                        <div>
                          Favorilerim
                          <Badge bg='danger'>
                            {favorite.length < 1 ? "" : favorite.length}
                          </Badge>
                        </div></NavLink> </div> : null}
                </li>
                <li>
                  {user ?
                    <div className='mt-2'>
                      <NavLink
                        className='buttons'
                        to={"/profile"}><div
                        >Profil</div></NavLink></div> : null}
                </li>
                <li >
                  {user ?<div className='mt-2'   onClick={handleLogout}
                    > <NavLink className='buttons 'to={"/"}>
                    Çıkış Yap</NavLink></div> : null}
                </li>
              </ul>
            </Nav>
            {user ? <Form className='form-header' onSubmit={handleSubmit}>
              <div className='icon'>
                <i className='searchIcon'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </i>
                <Form.Control
                  onChange={(e) => dispatch(searchMovie(e.target.value))}
                  className='search'
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
            </Form> : null}
          </Navbar.Collapse>
        </Container>
      </Navbar> :
        <Navbar className='nav' >
          <Container>
            <Navbar.Brand className='navbar-brand'>Best Movies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" >
                <ul className='no-list' >
                  {user ? <NavLink className="user-link" id='home'
                    to={"/"}>Ana sayfa</NavLink> : null}
                  <li>
                    <NavLink className="no-user" to={"/sign"}>Kayıt Ol</NavLink>
                  </li>
                  <li>
                    <NavLink className="no-user" to={"/login"}>Giriş Yap</NavLink>
                  </li>
                </ul>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>}
    </>
  )
}
