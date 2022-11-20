import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout as logoutHandle } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Firebase';
import "../Style/Header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Badge} from 'react-bootstrap';

export default function Header({
  searchMovie,
  favorite,
}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const handleLogout = async () => {
    await logout()
    dispatch(logoutHandle())
    navigate("login-up", {
      replace: true
    })
  }

  return (
    <>
      <Navbar className='nav' expand="lg">
        <Container>
          <Navbar.Brand style={{ color:"white",fontSize:"xxx-large"}}>Best Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
       
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" >
              <ul style={{ listStyle: "none", marginTop: "20px" }}>
                <NavLink className="user-link" id='home'
                  to={"/"}>Ana sayfa</NavLink>
                <li>{user ? "" :
                  <NavLink className="user-link" to={"/sign-up"}>Kayıt Ol</NavLink>}
                </li>
                <li> {user ?
                  <div className='user-name mt-2'>{user.displayName || user.email} </div> :
                  <NavLink className="user-link" to={"/login-up"}>Giriş Yap</NavLink>}
                </li>
                <li>
                   { user.photoURL ? 
                   <img style={{
                    width:"40px",
                    height:"40px",
                    borderRadius:"10px"
                   }} src={user.photoURL} 
                   alt={user.displayName}/> : null}
                </li>
                <li>
                  {user ?
                  <div className='mt-2'>
                    <NavLink className='twiceBtn'to={`/favorite`}>
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
                  className='twiceBtn'
                   to={"/profile"}><div
                  >Profil</div></NavLink></div> : null}
                </li>
                <li >
                  {user ? <NavLink  to={"/"}>
                   <button className='btn' onClick={handleLogout}
                    >Çıkış Yap</button></NavLink> : null}
                </li>
              </ul>
            </Nav>
            <Form className='form-header'>
              <div className='icon'>
                <i className='searchIcon'><FontAwesomeIcon icon={faMagnifyingGlass}/></i> 
                <Form.Control
                className='search'
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchMovie}
              />
              </div>
            </Form> 
          </Navbar.Collapse>  
        </Container>
      </Navbar>
    </>
  )
}
