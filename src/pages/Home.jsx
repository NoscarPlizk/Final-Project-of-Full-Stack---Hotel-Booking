import { Row, Col, Container, Card ,Image } from "react-bootstrap";
import LeftBar from "../component/LeftBar"
import RightSector from "../component/RightSector";

export default function Home() {

  return (
    <Container>
      <Row>
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/3/35/Neckertal_20150527-6384.jpg" 
          height="350"
          className="mx-auto mb-5"
        />
        <Col>
          <LeftBar />
        </Col>
        <Col>
          <RightSector />
        </Col>
      </Row>
    </Container>    
  );
}