import { Row, Col, Card, Image, Button, Container } from "react-bootstrap";
import { BookedList } from "../content/hotelContent";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Booking({ hotels, remove }) {

  const minusRoom = (room, hotelname) => {
    room - 1;
    if (room === 0) remove(hotelname);
  };

  const plusRoom = (room) => {
    room + 1;
  };

  return (
  <>
    { hotels && hotels.length > 0 ?
      hotels.map((bk) => (
        <Card key={bk.id}>
          <Card.Body>
            <Row>
              <Col>
                <Image src={bk.hotel_img_link} width={300} height={300}/>
              </Col>
              <Col>
                <Container>
                  <Row>
                    <h3>{bk.hotel_name}</h3>
                    <p>Amount of Room: {bk.room_amount}</p>
                    <p>Total Price of Booked the Hotel {bk.total_price}</p>
                  </Row>
                  <Row>
                    <Col>{bk.start_date}</Col>
                    <Col>Until</Col>
                    <Col>{bk.end_date}</Col>
                  </Row>
                </Container>
              </Col>
              <Col>
                <Card> 
                  <Card.Body>
                    {bk.booked_status === false ? 
                    <h5>Not Purchased</h5> : <h5>Purchased</h5>}
                  </Card.Body>
                </Card>
                <Button onClick={() => plusRoom(bk.room_amount)}>
                  + Plus Room
                </Button>
                <Button onClick={() => minusRoom(bk.room_amount, bk.hotel_name)}>
                  - Minus Room
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        ))
      : 
        (<Card>
          <Container>
            <Card.Body>
              <h4>You Still had no booking yet!</h4>
            </Card.Body>
          </Container>
        </Card>) 
    }
  </>
  );
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
  );
};

export default function AllBookedList() {
  const APIurl = useContext(BookedList).APIurl;
  const [ bookedData, setBookedData ] = useState(null);

  const GetBookedData = async () => {
    try {
      const res = await axios.get(`${APIurl}getallbookeddata`);
      {res.data === res.data.message ? 
        setBookedData(null) : setBookedData(res.data)
      }  
    } catch (error) {
      return console.log(error);
    }
  };

  const deleteBooked = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`${APIurl}deletebook`);
      if (!res.data) {console.log(`Delete Success`);};
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetBookedData();
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <Booking hotels={bookedData} remove={deleteBooked}/>
        </Col>
        <Col md={4}>
          <Order />
        </Col>
      </Row>
    </>
  );
};