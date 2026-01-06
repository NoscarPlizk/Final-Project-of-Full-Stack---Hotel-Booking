import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { BookedList } from "../content/hotelContent";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Booking(hotels, remove) {
  const minusRoom = (room, hotelname) => {
    room - 1;
    if (room === 0) remove(hotelname);
  }

  const plusRoom = (room) => {
    room + 1;
  }

  return hotels.map((bk) => {
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <Image src={bk.image} width={300} height={300}/>
            </Col>
            <Col>
              <h3>{bk.name}</h3>
              <p>Amount of Room: {bk.room}</p>
              <p>Total Price of Booked the Hotel {bk.total}</p>
            </Col>
            <Col>
              <Button onClick={plusRoom(bk.room)}>
                + Plus Room
              </Button>
              <Button onClick={minusRoom(bk.room, bk.name)}>
                - Minus Room
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  });
};

function Order() {
  const redirect = useNavigate();

  const goToCheckOutPage = () => {
    redirect('/payment');
  };

  return ( 
    <>
      <Card>
        <p></p>
        <Button onClick={goToCheckOutPage}>
          Check Out
        </Button>
      </Card>
    </>
  )
}

export default function AllBookedList() {
  const booked = useContext(BookedList).booked;
  const setBooked = useContext(BookedList).setBooked;

  function deleteBooked(currentBooked) {
    setBooked(booked => {
      booked.filter(bk => bk.name !== currentBooked)
    })
  }

  return (
    <>
      <Row>
        <Col md={10}>
          <Booking hotels={booked} remove={deleteBooked}/>
        </Col>
        <Col md={2}>
          <Order />
        </Col>
      </Row>
    </>
  );
}