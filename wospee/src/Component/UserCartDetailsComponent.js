import {
    Container,
    Row,
    Col,
    Form,
    Alert,
    ListGroup,
    Button,
  } from "react-bootstrap";
  import CartItemComponent from "../Component/CartItemComponent";
  import { useEffect , useState } from "react";
  import {useNavigate} from 'react-router-dom'

  const UserCartDetailsComponent = ({cartItems, itemsCount,cartSubtotal,addToCart,userInfo, removeFormCart, reduxDispatch,getUser,createOrder}) => {

   const [buttonDisabled,setButtonDisabled] = useState(false);
   const[userAddress,setUserAddress] = useState(false);
   const [missingAddress , setMissingAddress] = useState(false);
   const[paymentMethod , setPaymentMethod] = useState("pp")
  
   const navigate = useNavigate();

 const changeCount = (productId , count) =>{
    reduxDispatch(addToCart(productId,count))
 }

 const removeFromCartHandler = (productId,quantity,price) =>{
    if(window.confirm("Are You Sure")){
        reduxDispatch( removeFormCart(productId,quantity,price));
    }
 }

//  getUser().then(res => console.log(res))










useEffect(()=>{
  
  getUser()
  .then((data) => {
    if(!data.address|| !data.city || !data.country ||
       
      !data.state || !data.phoneNumber){

        setButtonDisabled(true);
        setMissingAddress("Fill out the profile data correctly")
      }else{
        setUserAddress({address:data.address , city :data.city,
        country:data.country, zipCode:data.zipCode,state: data.state,
        phoneNumber: data.phoneNumber})
        setMissingAddress(false)
      }
     
  })
  .catch((err) => console.log(err.response.data.message ? err.response.data.message : err.response.data))
},[userInfo._id])

console.log(cartSubtotal,"SubTotal");


// const orderHandler = () => {
//   const orderData = {
//       orderTotal: {
//          itemsCount: itemsCount, 
//          cartSubtotal: cartSubtotal,
//       },
//       cartItems: cartItems.map(item => {
//           return {
//               productID: item.productID,
//               name: item.name,
//               price: item.price,
//               image: { path: item.image ? (item.image.path ?? null) : null },
//               quantity: item.quantity,
//               count: item.count,

//           }
//       }),
//       paymentMethod:PaymentMethod,
      
//   }
//   createOrder(orderData).then(data =>{
//     if(data){
//       navigate("/user/order-details/" +data._id);
//     }
//   })
//   .catch((err) => console.log(err,"Lok"))
// }


// const choosePayment = (e) =>{
//   setPaymentMethod(e.target.value)

// }


const orderHandler = () => {
  const orderData = {
      orderTotal: {
         itemsCount: itemsCount, 
         cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map(item => {
          return {
              productID: item.productID,
              name: item.name,
              price: item.price,
              image: { path: item.image ? (item.image.path ?? null) : null },
              quantity: item.quantity,
              count: item.count,

          }
      }),
      paymentMethod: paymentMethod,
  }
 createOrder(orderData)
 .then(data => {
     if (data) {
        navigate("/user/order-details/" + data._id);
     }
 })
 .catch((err) => console.log(err));
}

const choosePayment = (e) => {
  setPaymentMethod(e.target.value);
}

    return (
   
      <Container fluid>
        <Row className="mt-4">
          <h1>Cart Details</h1>
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2>Shipping</h2>
                <b>Name</b>: {userInfo.name}{userInfo.lastName} <br />
                <b>Address</b>:{userAddress.address}<br />
                <b>Phone</b>: {userAddress.phoneNumber}
              </Col>
              <Col md={6}>
                <h2>Payment method</h2>
                <Form.Select onChange={choosePayment}>
                  <option value="pp">PayPal</option>
                  <option value="cod">
                    Cash On Delivery (delivery may be delayed)
              
                  </option>
                </Form.Select>
              </Col>
              <Row>
                <Col>
                  <Alert className="mt-3" variant="danger">
                    Not delivered. {missingAddress}
                  </Alert>
                </Col>
                <Col>
                  <Alert className="mt-3" variant="success">
                    Not paid yet
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Order items</h2>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent item={item} key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
                />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Order summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Items price (after tax): <span className="fw-bold">${cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Shipping: <span className="fw-bold">included</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Tax: <span className="fw-bold">included</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
                Total price: <span className="fw-bold">${cartSubtotal}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                <Button size="lg" onClick={orderHandler}  variant="danger" type="button" disabled={buttonDisabled}>
                    Order Now
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default UserCartDetailsComponent;
  
  