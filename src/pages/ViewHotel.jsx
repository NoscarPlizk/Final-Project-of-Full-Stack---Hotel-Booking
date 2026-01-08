import { Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { InfoContext } from "../content/infoContent";
import { BookedList } from '../content/hotelContent';

export default function ViewHotel() {
  const token = useContext(BookedList).token;
  const setBooked = useContext(BookedList).setBooked;
  const booked = useContext(BookedList).booked;
  const redirect = useNavigate();
  const { state } = useLocation(); // Layout.jsx

  const image = state?.img;
  const name = state?.name;
  const price = state?.price;
  const [ room, setRoom ] = useState(null);  
  let total = room * price;

  const inspectAuthThenAddBook = () => {
    if (!token) redirect('/userauth');
    setBooked([...booked, {image, name, room, total} ]);
    redirect("/");
  }

  const increaseRoomAmount = () => {
    setRoom(room + 1);
  }

  const decreaseRoomAmount = () => {
    setRoom(room - 1);
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
            <h4><strong>RM {price}</strong> per Room</h4>
            <Row>
              <Col>
                <Button onClick={increaseRoomAmount}>
                  +
                </Button>
              </Col>
              <Col>
                <p>{room} Room </p>
              </Col>
              <Col>
                <Button onClick={decreaseRoomAmount}>
                  -
                </Button>
              </Col>
            </Row>
            <h4>Total RM: {total}</h4>
            <Button onClick={inspectAuthThenAddBook}>
              Book Now
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}