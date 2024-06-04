import OrderDetailsPage from "../pages/admin/components/OrderDetailsPage";
import axios from "axios";

const getOrder = async(id) =>{
  const {data} =await axios.get("/api/orders/user" +id);

}




const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/orders/delivered/" + id);
  if (data) {
      return data;
  }
}
const AdminOrderDetailsPage = () => {

  return (
   <>
   <OrderDetailsPage getOrder={getOrder} markAsDelivered={markAsDelivered}/>
   </> 
  )
};

export default AdminOrderDetailsPage;

