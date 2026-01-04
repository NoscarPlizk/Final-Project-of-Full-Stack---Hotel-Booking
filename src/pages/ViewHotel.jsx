import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function ViewHotel() {  
  const redirect = useNavigate();
  const { state } = useLocation();

  const image = state?.img;
  const name = state?.name;
  const price = state?.price;

  const redirected = () => {
    redirect("/payment", { 
      state: { name, price }
    });
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img src={image} width="200" height="250"/>
          </Col>
          <Col>
            <h3>{name}</h3>
            <p>Description</p>
            <h4><strong>RM {price}</strong></h4>
            <Button onClick={redirected}>
              Book Now
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}