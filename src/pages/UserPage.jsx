import { Col, Image, Row } from "react-bootstrap";
import axios from "axios";


export default function UserPage() {  

  return (
    <>
      <Col>
      <Row>
        <Image 
          src={picture} 
          roundedCircle
        />
        <h1>Username</h1>
      </Row>
      <Row>

        <Button>
          Edit Profile Settings
        </Button>
        <Button >
          Log Out
        </Button>
      </Row>

    </Col>
    </>
  );
}