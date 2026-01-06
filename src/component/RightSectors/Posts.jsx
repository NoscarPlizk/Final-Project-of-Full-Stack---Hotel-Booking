import { Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StartRank({ rank }) {
  return (
    <>
      {rank ? <p>⭐ {rank}</p> : <p>⭐ 'Unavaliable Ranking'</p>}
    </>
  );
}

export default function Posts({ img, name, location, star, price }) {
  const redirect = useNavigate();
  
  const redirected = () => {
    redirect("/viewhotel", {
      state: { img, name, location, star, price }
    }); 
  };

  return (
    <Card>
      <Row>
        <Col> 
          <img src={img} width="400" height="450" />
        </Col>
        <Col>
          <h3>{name}</h3>
          <StartRank rank={star}/>
          <p>{location}</p>
        </Col>
        <Col>
          <p><strong>RM {price}</strong> per night</p>
          <Button onClick={redirected}>
            See avaliability
          </Button>
        </Col>
      </Row>
    </Card>
  );
}