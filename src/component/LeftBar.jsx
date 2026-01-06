import { Row, Col, Button, Card } from "react-bootstrap";

export default function LeftBar() {

  return (
    <Col md={4}>
      <Card id="Price Range">
        <Row>
          <h3>Price Range</h3>s
          <Button>
            <p>Reset</p>
          </Button>
        </Row>
      </Card>

      <Card id="star">
        <Row>
          <h3>Star Rank</h3>
          <label>
            <input type="checkbox" /> 1 ⭐ 
          </label>
          <label>
            <input type="checkbox" /> 2 ⭐ 
          </label>
          <label>
            <input type="checkbox" /> 3 ⭐ 
          </label>
          <label>
            <input type="checkbox" /> 4 ⭐ 
          </label>
          <label>
            <input type="checkbox" /> 5 ⭐ 
          </label>
        </Row>
      </Card>
    </Col>
  )
} 