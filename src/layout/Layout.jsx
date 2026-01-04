import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href='/'>Hotel4Book</Navbar.Brand>
          <Nav>
            <Nav.Link href='/userAuth'>Let Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
