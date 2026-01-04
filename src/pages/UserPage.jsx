import { Col, Image, Row } from "react-bootstrap";
import axios from "axios";


export default function UserPage() {

  db = "lognlongurl"
  


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
        {post.map((booked) => {
          <ul key={booked.id} />
        })}
        <Button>
          Edit
        </Button>
        <Button>
          Delete
        </Button>
      </Row>

    </Col>
    </>
  );
}