
import axios from "axios";
import AdminCreatePageComponent from "./Component/AdminCreatePageComponent"
import {uploadImagesApiRequest , uploadImagesCloudinaryApiRequest} from "../../src/pages/admin/utils/utils";
import {useSelector} from "react-redux";
import { newCategory ,deleteCategory,saveAttributeToCatDoc} from "../redux/actions/categoryAction";
import { useDispatch } from "react-redux";



const createProductApiRequest = async (formInputs) => {
    const { data } = await axios.post(`/api/products/admin`,{...formInputs});
    return data;
}







const AdminCreatePage = () => {
    const {categories} = useSelector((state) => state.getCategories);
    const dispatch = useDispatch();

  return <AdminCreatePageComponent 
  createProductApiRequest={createProductApiRequest}
  uploadImagesApiRequest={uploadImagesApiRequest} 
  uploadImagesCloudinaryApiRequest= {uploadImagesCloudinaryApiRequest}
  categories={categories}
  reduxDispatch={dispatch}
  newCategory={newCategory}
  deleteCategory={deleteCategory}
  saveAttributeToCatDoc={saveAttributeToCatDoc}
    />;
};


export default AdminCreatePage;

