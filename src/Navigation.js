import React from 'react';
//import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation({loggedIn, setLoggedIn}){

  const handleLogout = async () => {
    await fetch("http://localhost:8080/Logout", {method: "POST"});
    if(Response.ok){
      setLoggedIn(l => !l);
      window.location.path = "/";
    }else{
      console.log("error logging out");
    }
  };

  return (
    <nav className="nav">
      <Link to='/' className='site-title'>Meyni Beats</Link>
      <ul>
        <Link to="/User_profile">Your profile</Link>
        <Link to="/Upload_Beat">Upload Beat</Link>
        {loggedIn ? (
          <Link to="" onClick={ handleLogout }>Logout</Link>
        ):(
          <Link to="/Login">Login</Link>
        )}
      </ul>
    </nav>
  );
}




/*
const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">My Beats Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#beats">Beats</Nav.Link>
          <Nav.Link href="#upload">Upload</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
*/