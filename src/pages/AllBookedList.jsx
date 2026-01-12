import { Row, Col, Card, Image, Button, Container } from "react-bootstrap";
import { BookedList } from "../content/hotelContent";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import axios from "axios";

function Booking({ hotels, selectedIds, setSelectedIds }) {
  // function plusRoom(room) {
  //   room + 1;
  // };

  // function minusRoom(room, hotelname) {
  //   room - 1;
  //   if (room === 0) remove(hotelname);
  // };

  function toggleSelected(id, checked) {
      setSelectedIds(prev => {
      const safeId = Number(id); 
      if (checked) return [...new Set([...prev, safeId])];
      return prev.filter(x => x !== safeId);
    });
  }

  return (
  <>
    <Row id='Booked Hotel'>
      { hotels && hotels.length > 0 ?
        hotels.filter(bk => bk.booked_status === true)
        .map((bk) => {
          return (
            <Card>
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
                    {/* <Button onClick={() => plusRoom(bk.room_amount)}>
                      + Plus Room
                    </Button>
                    <Button onClick={() => minusRoom(bk.room_amount, bk.hotel_name)}>
                      - Minus Room
                    </Button> */}
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
        hotels.map((bk) => (
          <Card key={bk.id}>
            <Card.Body>
              <Row>
                <Col md={1}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(bk.id)}
                    disabled={bk.booked_status === true}
                    onChange={(e) => toggleSelected(bk.id, e.target.checked)}
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
                  {/* <Button onClick={() => plusRoom(bk.room_amount)}>
                    + Plus Room
                  </Button>
                  <Button onClick={() => minusRoom(bk.room_amount, bk.hotel_name)}>
                    - Minus Room
                  </Button> */}
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

function Order({ selectedId }) {
  const redirect = useNavigate();

  function executeRedirect(selectedId) {
    redirect('/payment', { state: { selectedId }});
  };

  return ( 
    <>
      <Card>
        <Card.Body>
          <Button onClick={() => executeRedirect(selectedId)}>
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
  const [ selectedIds, setSelectedIds ] = useLocalStorage("selectedHotelIds", []);

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

  // const deleteBooked = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.delete(`${APIurl}deletebook`);
  //     if (!res.data) {console.log(`Delete Success`);};
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    GetBookedData();
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <Booking 
            hotels={bookedData} 
            selectedIds={selectedIds} 
            setSelectedIds={setSelectedIds}
          />
        </Col>
        <Col md={4}>
          <Order selectedId={selectedIds} />
        </Col>
      </Row>
    </>
  );
};