import AdminAnalyticsPageComponent from "./components/AdminAnalyticPageComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";


const AdminAnalyticsPage = () => {
  const fetchOrdersForFirstDate = async (abctrl, firstDateToCompare) => {
           console.log(firstDateToCompare,"Data Check");
    const { data } = await axios.get("/api/orders/analysis/" + firstDateToCompare, {
    signal: abctrl.signal,
  } );
  return data;
}


const fetchOrdersForSecondDate = async (abctrl, secondDateToCompare) => {
  console.log("Second Trigger",secondDateToCompare);
  const { data } = await axios.get("/api/orders/analysis/"+ secondDateToCompare, {
    signal: abctrl.signal,
  });
  return data;
};
  return (
    <AdminAnalyticsPageComponent fetchOrdersForFirstDate={fetchOrdersForFirstDate} fetchOrdersForSecondDate={fetchOrdersForSecondDate} socketIOClient={socketIOClient}/>
  );
};

export default AdminAnalyticsPage;

