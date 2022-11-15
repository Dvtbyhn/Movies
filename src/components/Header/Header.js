import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout as logoutHandle } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Firebase';
import "./Header.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';


export default function Header({
  searchMovie,
  favorite,
  userID,
}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  

  const { user } = useSelector(state => state.auth)

  const handleLogout = async () => {
    await logout()
    dispatch(logoutHandle())
    navigate("loginUp", {
      replace: true
    })
  }


  return (
    <>

      <Navbar expand="lg">
        <Container>
          <Navbar.Brand style={{ color: "white", fontSize: "xxx-large" }}>Best Movies</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{backgroundColor:"white"}} />
          <Navbar.Collapse id="basic-navbar-nav" >

            <Nav className="me-auto" >

              <ul style={{ listStyle: "none", marginTop: "20px" }}>

                <NavLink className="user-link" id='home'
                  to={"/"}>Ana sayfa</NavLink>


                <li >{user ? "" :
                  <NavLink className="user-link" to={"/signUp"}>Kayıt Ol</NavLink>}
                </li>

                <li > {user ?
                  <h5 className='user-name mt-2'>{user.displayName || user.email} </h5> :
                  <NavLink className="user-link" to={"/loginUp"}>Giriş Yap</NavLink>}
                </li>

                <li >
                  {
                    user.photoURL ? <img src={user.photoURL} alt={user.photoURL}
                      style={{ width: "40px", height: "40px", borderRadius: "10px" }} /> : null
                  }
                </li>

                <li>
                  {user ?
                    <NavLink to={`/favorite/${userID}`}
                      className=' btn btn-danger'>
                      Favorilerim<span className='badge badge-light'>
                        {favorite.length < 1 ? null : favorite.length}</span></NavLink> : null}
                </li>

                <li>
                  {user ? <NavLink to={"/update"}
                    className=' btn btn-dark'>Profil</NavLink> : null}
                </li>

                <li >
                  {user ? <button onClick={handleLogout}
                    className=' btn btn-dark'>Çıkış Yap</button> : null}
                </li>
              </ul>

            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={searchMovie}
              />
            </Form>
          </Navbar.Collapse>

        </Container>
      </Navbar>

    </>
  )
}
