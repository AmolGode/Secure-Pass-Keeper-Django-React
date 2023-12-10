import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// import { ThreeDotsVertical } from 'react-bootstrap-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBold, faKey } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

// import {passStoreData, setPassStoreData} from '../../dashboard/Dashboard/Dashboard.jsx';




function HeaderNavbar() {

  const accessToken = Cookies.get('access_token');

  let firstName = Cookies.get('first_name');
  let lastName = Cookies.get('last_name');
  let email = Cookies.get('email');
  let phone = Cookies.get('phone');

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    firstName = Cookies.get('first_name');
    lastName = Cookies.get('last_name');
    email = Cookies.get('email');
    phone = Cookies.get('phone');
    setShow(true);
  }

  const handleAddForm = () => {
    navigate("/add-password-form")
  }

  const handleDashboardRedirect = () => {
    navigate("/dashboard")
  }

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    navigate("/")
  }

  // function handleSearch() {
  //   search_title = "Facebook"
  //   // Convert search_title to lowercase for case-insensitive search
  //   const searchTitleLowerCase = search_title.toLowerCase();

  //   // Use the filter method to create a new array with matching objects
  //   const matchingObjs = passStoreData.filter(obj =>
  //     obj.title.toLowerCase().includes(searchTitleLowerCase)
  //   );

  //   setPassStoreData(matchingObjs)
  //   console.log(matchingObjs)
  // }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#"><FontAwesomeIcon icon={faKey} /> Secure Pass Keeper </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll">
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              {accessToken &&
                <>
                  <Nav.Link onClick={handleDashboardRedirect}>Dashboard</Nav.Link>
                  <Nav.Link onClick={handleAddForm}>Add Password</Nav.Link>
                </>
              }


            </Nav>

            {/* {accessToken &&
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            } */}

            {accessToken &&
              <NavDropdown title={`Welcome ${firstName}`} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item onClick={handleShow}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Nav.Link style={{ color: 'red', textDecoration: faBold }} onClick={handleLogout}>Logout</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Name : {firstName} {lastName}
          <hr></hr>
          Email : {email}
          <hr></hr>
          Phone : {phone}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default HeaderNavbar;