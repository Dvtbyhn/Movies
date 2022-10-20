import React from 'react'



export default function Header(props) {


  return (
    <>
      <nav className="navbar navbar-expand-lg" id='#nav'>
        <div className="container-fluid">
          <div className="navbar-brand" style={{color:"white"}}>Best Movie</div>
          
          <div className="navbar-collapse" id="navbarSupportedContent">
        
            <form className="" role="search"  >
              <input className="form-control me-2" type="search"
                placeholder="Arama " aria-label="Search"   onChange={props.searchMovieProp}   />
             
            </form>
          </div>
        </div>
      </nav>


    </>
  )
}
