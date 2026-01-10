import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Card, Row, Col, Button, Image } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useState, useContext } from 'react';
import { BookedList } from '../content/hotelContent';
import { InfoContext } from "../content/infoContent";

export default function Layout() {
  const token = useContext(BookedList).token;

  const [ initialDate, setInitialDate ] = useState('');
  const [ dueDate, setDueDate ] = useState('');
  const [ adultPax, setAdultPax ] = useState('');
  const [ childPax, setChildPax ] = useState('');

  const startDate = (value) => {
    setInitialDate(value);
  }

  const endDate = (value) => {
    setDueDate(value);
  }

  return (
    <>
      <Navbar bg="success">
        <Container>
          <Navbar.Brand href='/'><strong>Hotel4Book</strong></Navbar.Brand>
          <Nav>
            <Nav.Link href='/userauth'>
              {!token ? <Button>Login</Button> : null}
            </Nav.Link>
            <Nav.Link href='/allbookedlist'>
              {token ? <Button>Check Booked Hotel List</Button> : null }
            </Nav.Link>
            <Nav.Link href='/userpage'>
              {token ? <Image 
                src='https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'
                roundedCircle
                style={{ width: 90, height: 90 }}
              /> : null }
            </Nav.Link>
          </Nav>
        </Container>
        <Card className="mx-auto">
          <Card.Body>
            <Row>
              <Col>
              <h4>City, destination, or hotel name</h4>
                <input type="text" list="Location" placeholder="Location" />
                <datalist id="Location" >
                  <option value="Kuala Lumpur" />
                  <option value="Singapore" />
                  <option value="Bangkok" />
                  <option value="Jakarta" />
                  <option value="Ho Chi Minh City" />
                </datalist>
              </Col>
              <Col>
                <h4>Check In and out</h4>
                  <input type="date" value={initialDate} onChange={(e) => startDate(e.target.value)}/>
                  <input type="date" value={dueDate} onChange={(e) => endDate(e.target.value)}/>
              </Col>
              <Col>
                <h4>How many People?</h4>
                <select value={adultPax} onChange={(e) => setAdultPax(e.target.value)}>
                  <option value='1'>1 Adult</option>
                  <option value='2'>2 Adult</option>
                  <option value='3'>3 Adult</option>
                  <option value='4'>4 Adult</option>
                  <option value='5'>5 Adult</option>
                  <option value='6'>6 Adult</option>
                </select>
                <select value={childPax} onChange={(e) => setChildPax(e.target.value)}>
                  <option value='1'>1 Children</option>
                  <option value='2'>2 Children</option>
                  <option value='3'>3 Children</option>
                  <option value='4'>4 Children</option>
                  <option value='5'>5 Children</option>
                  <option value='6'>6 Children</option>
                </select>
              </Col>
            </Row>
          </Card.Body> 
        </Card>        
      </Navbar>
      <InfoContext.Provider value={{ initialDate, dueDate, adultPax, childPax }}>
        <Outlet />
      </InfoContext.Provider>
    </>
  );
}
