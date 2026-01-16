import { Row, Col, Card, Image, Button, Container } from "react-bootstrap";
import { BookedList } from "../content/hotelContent";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import axios from "axios";

function Booking({ hotels, selectedHotelName, setSelectedHotelName, plusRoom, minusRoom, removeSlot}) {

  function toggleSelected(hotel_name, checked) {
      setSelectedHotelName(prev => {
      if (checked) return [...new Set([...prev, hotel_name])];
      return prev.filter(x => x !== hotel_name);
    });
  };

  return (
  <>
    <h2>Booked Room</h2>
    <Row id='Booked Hotel'>
      { hotels && hotels.length > 0 ?
        hotels.filter(bk => bk.booked_status === true)
        .map((bk) => {
          return (
            <Card key={bk.hotel_name}>
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
                    <Button onClick={() => removeSlot(bk.hotel_name)}>
                      Cancel Booked
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })
      :
        (<Card>
          <Container>
            <Card.Body>
              <h4>You Still had no Booked Hotel!</h4>
            </Card.Body>
          </Container>
        </Card>) 
      }
    </Row>
    <Row id='Cart List'>
      <h2>Pending for Book</h2>
      { hotels && hotels.length > 0 ?
        hotels.filter(bk => bk.booked_status === false)
        .map((bk) => (
          <Card key={bk.hotel_name}>
            <Card.Body>
              <Row>
                <Col md={1}>
                  <input
                    type="checkbox"
                    checked={selectedHotelName.includes(bk.hotel_name)}
                    disabled={bk.booked_status === true}
                    onChange={(e) => toggleSelected(bk.hotel_name, e.target.checked)}
                  />
                </Col>
                <Col md={3}>
                  <Image src={bk.hotel_img_link} width={300} height={300}/>
                </Col>
                <Col md={6}>
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
                <Col md={2}>
                  <Card> 
                    <Card.Body>
                      {bk.booked_status === false ? 
                      <h5>Not Purchased</h5> : <h5>Purchased</h5>}
                    </Card.Body>
                  </Card>
                  <Button onClick={() => plusRoom(bk.hotel_name)}>
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
    </Row>
  </>
  );
};

function Order({ selectedHotelName }) {
  const redirect = useNavigate();

  function executeRedirect(selectedHotelName) {
    redirect('/payment', { state: { selectedHotelName }});
  };

  return ( 
    <>
      <Card>
        <Card.Body>
          <Button onClick={() => executeRedirect(selectedHotelName)}>
            Go Check Out
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default function AllBookedList() {
  const APIurl = useContext(BookedList).APIurl;
  const [ bookedData, setBookedData ] = useState(null);
  const [ selectedHotelName, setSelectedHotelName ] = useLocalStorage("selectedHotelIds", []);
  console.log({ chooseName: selectedHotelName });

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

  async function plusRoom(hotel_name) {
    const setNum = 1;
    try {
      await axios.put(`${APIurl}increaseroom`, {setNum, hotel_name});
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  async function minusRoom(room, hotel_name) {
    const setNum = 1;
    if (room === 0) removeSlot(hotel_name);
    try {
      await axios.put(`${APIurl}decreaseroom`, {setNum, hotel_name});
      await GetBookedData();
    } catch (error) {
      console.log(error);
    }
  };

  async function removeSlot(hotel_name) {
    try {
      await axios.delete(`${APIurl}deletebookrow`, { data: { hotel_name } });
      await GetBookedData();
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
          <Booking 
            hotels={bookedData} 
            selectedHotelName={selectedHotelName} 
            setSelectedHotelName={setSelectedHotelName}
            plusRoom={plusRoom}
            minusRoom={minusRoom}
            removeSlot={removeSlot}
          />
        </Col>
        <Col md={4}>
          <Order selectedHotelName={selectedHotelName} />
        </Col>
      </Row>
    </>
  );
};