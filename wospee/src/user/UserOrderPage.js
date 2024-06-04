import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserOrderDetailsPageComponent from "../Component/UserOrderPageComponent";
import axios from "axios";

const getOrders = async () => {
  const {data} = await axios.get("/api/orders");
  return data;
}

const UserOrdersPage = () => {
  return (
 <>
 
 <UserOrderDetailsPageComponent getOrders={getOrders}/>
 
 </>
  );
};

export default UserOrdersPage;

