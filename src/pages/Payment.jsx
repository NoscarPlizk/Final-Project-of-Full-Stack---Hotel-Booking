import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const price = state?.price;

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>
                Credit Card Details
              </Form.Label>
              <Form.Control type='number' max="12" placeholder="Card Number"/>
              <Form.Control type='number' max="5" placeholder="Expiry Date" />
              <Form.Control type='number' max="3" placeholder="CVS Code" />
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <h3>{price}</h3>
          <Button>
            Pay To Book
          </Button>
        </Col>
      </Row>
    </Container>
  )
}