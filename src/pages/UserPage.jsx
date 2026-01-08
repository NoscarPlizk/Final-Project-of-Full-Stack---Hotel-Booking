import { Col, Image, Row, Button, Container } from "react-bootstrap";
import { useContext } from "react";
import { BookedList } from "../content/hotelContent";
import { useNavigate } from "react-router-dom";

export default function UserPage() {  
  const terminateSession = useNavigate();
  const setToken = useContext(BookedList).setToken;

  const SignOutProcess = () => {
    setToken('');
    terminateSession('/');
  }

  return (
    <Container>
      <Col>
        <Row>
          <Image 
            src="https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg" 
            roundedCircle
            style={{ width: 90, height: 90 }}
          />
          <h1>Username</h1>
        </Row>
        <Row>
          <Button>
            Edit Profile Settings
          </Button>
          <Button onClick={SignOutProcess}>Log Out</Button>
        </Row>
      </Col>
    </Container>
  );
}