import { useSelector } from "react-redux";
import EditProductPageComponent from "../pages/admin/components/EditProductPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import {saveAttributeToCatDoc} from "../../src/redux/actions/categoryAction"
import {uploadImagesApiRequest , uploadImagesCloudinaryApiRequest} from "../pages/admin/utils/utils"

const fetchProducts = async(productId) =>{
  const {data} = await axios.get(`/api/products/get-one/${productId}`);
  return data;
}


const updateProductApiRequest = async(productId ,formInputs) =>{
 const {data} = await axios.put(`/api/products/admin/${productId}`,{
  ...formInputs
 })
 return data;

}










const AdminEditProductPage = () => {
  
  const {categories} = useSelector((state) => state.getCategories)
  
  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath)

    if(process.env.NODE_ENV !== "production"){
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`)
    }else{
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}?cloudinary=true`);
      
    }
  

}

  return (
   
   <>
   <EditProductPageComponent categories={categories} fetchProducts={fetchProducts}
   updateProductApiRequest={updateProductApiRequest}
   reduxDispatch={reduxDispatch} saveAttributeToCatDoc={saveAttributeToCatDoc}
   imageDeleteHandler={imageDeleteHandler}
   uploadImagesApiRequest={uploadImagesApiRequest}
   uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
   />
   </>
  );
};

export default AdminEditProductPage;

