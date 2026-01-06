import { Form, Row, Col, Container } from "react-bootstrap";
import BookedCardList from "./BookedCardList";
import { useContext } from "react";
import { BookedList } from "../../content/hotelContent";

export default function Payment() {
  const booked = useContext(BookedList).booked;

  return (
    <Container>
      <Row>
        <Col md={8}> 
          <Form>
            <Form.Group>
              <Form.Label>
                Guest Details
              </Form.Label>
              <Form.Control type='text' required placeholder="Full Legal Name Should Same as Passport Name"/>
              <Form.Control type='text' required placeholder="Email Address" />
              <Form.Control type='text' required placeholder="Phone Number" />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Credit Card Details
              </Form.Label>
              <Form.Control type='number' required max="12" placeholder="Card Number"/>
              <Form.Control type='number' required max="5" placeholder="Expiry Date" />
              <Form.Control type='number' required max="3" placeholder="CVS Code" />
            </Form.Group> // PayPal, 
          </Form>
          <div>
            <Card>
              <Card.Body>
                <h3>Cancelation Policy</h3>
                <p>Free Cancelation before Nov 30</p>
              </Card.Body>
              <Card.Body>
                <h3>Ground rules</h3>
                <p>We ask every Guest the basic infomation to secure the side of customer and the hotel</p>
              </Card.Body>
            </Card>
          </div>
        </Col>
        <Col md={4}>
          <BookedCardList lists={booked} />
        </Col>
      </Row>
    </Container>
  )
}