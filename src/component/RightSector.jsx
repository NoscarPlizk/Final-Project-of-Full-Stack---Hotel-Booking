import { Row } from "react-bootstrap";
import Posts from "./RightSectors/Posts";

export default function RightSector() {
  return (
    <>
      <h1>Best Hotels on your wish</h1>
      <Row md={9}>
        <Posts 
          img='https://cf.bstatic.com/xdata/images/hotel/max1024x768/608301327.jpg?k=9025063c45b43804840037bfea5034f5c981110ee0748075f650421425066aa0&o=' 
          name='Hotel Indigo Kuala Lumpur on the Park by IHG' 
          location='Downtown Kuala Lumpur, Kuala Lumpur' 
          star={5} 
          price='549' 
        />      
      </Row>
    </>
  );
}