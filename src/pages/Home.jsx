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
          className="mx-auto"
        />
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
                  <input type="date"/>
                  <input type="date"/>
              </Col>
              <Col>
                <h4>How many People?</h4>
                <select>
                  <option value='1'>1 Adult</option>
                  <option value='2'>2 Adult</option>
                </select>
                <select>
                  <option value='1'>1 Children</option>
                  <option value='2'>2 Children</option>
                </select>
              </Col>
            </Row>
          </Card.Body> 
        </Card>        
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