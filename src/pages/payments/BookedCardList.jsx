import { Card } from 'react-bootstrap';

export default function BookedCardList(lists) {
    return lists.map((bk) => {
      <>
        <Card> 
          <Card.Body>
            <h3>RM {bk.totalPrice} per night</h3>
            <p>Hotel: {bk.hotelName}</p>
            <p>Start Date: <strong>{bk.fdate}</strong> to <strong>{bk.ddate}</strong> </p>
            <p>{bk.Apax} Adults and {bk.Cpax} Children</p>
            <Button>
              Pay To Book
            </Button>
          </Card.Body>
        </Card>
      </>
    }
  )
}