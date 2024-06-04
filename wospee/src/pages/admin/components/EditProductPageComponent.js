import {
    Row,
    Col,
    Container,
    Form,
    Button,
    CloseButton,
    Table,
    Alert,
    Image
  } from "react-bootstrap";
  import { Link } from "react-router-dom";
  import { useState ,useEffect, Fragment, useRef} from "react";
  import { useParams } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import { changeCategory ,setValuesForAttrFromDbSelectForm , setAttributesTableWrapper} from "../../../admin/Component/utils/utils";
  const onHover = {
      cursor: "pointer",
      position: "absolute",
      left: "5px",
      top: "-10px",
      transform: "scale(2.7)",
  }
  
 

  const EditProductPageComponent = ({categories,
    fetchProducts,
    updateProductApiRequest,
    reduxDispatch,
    saveAttributeToCatDoc,
    imageDeleteHandler,
    uploadHandler,
    uploadImagesApiRequest,
    uploadImagesCloudinaryApiRequest
  }) => {
     const [validated, setValidated] = useState(false);
     const [product , setProduct] = useState({});
     const [updateProductResponseState , setUpdateProductResponseState] = useState({message:'',error:''});
     const [attributeFromDb , setAttributesFormDb] = useState([]);
     const [attributesTable ,setAttributesTable] = useState([]); // html
     const [categoryChoosen , setCategoryChoosen] = useState("Choose category");
     const [newAttrKey , setNewAttrKey] = useState(false);
     const [newAttrValue , setNewAttrValue] = useState(false);
     const [imageRemoved , setImageRemoved] = useState(false);
     const [isUploading, setIsUploading] = useState("");
     const [imageUploaded , setImageUploaded] = useState(false);


      const attrVal = useRef(null);
      const attrKey = useRef(null);
      const createNewAttrKey = useRef(null);
      const createNewAttrVal = useRef(null);


    const {id} = useParams(); 

    const navigate = useNavigate()
  
  useEffect(() => {
   fetchProducts(id)
   .then((product) => setProduct(product)
   .then(console.log(product))
   )
   .catch((err) => console.log(err))
  },[id,imageRemoved,imageUploaded]);

  

  
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const formInputs = {
        name: form.name.value,
        description: form.description.value,
        count: form.count.value,
        price: form.price.value,
        category: form.category.value,
        attributesTable:attributesTable
    }

    if (event.currentTarget.checkValidity() === true) {
        updateProductApiRequest(id,formInputs)
        .then(data =>{
          if(data.message === "product updated") navigate("/admin/products");
        })
        .catch((err) =>  setUpdateProductResponseState({
          error:err.response.data.message
           ? err.response.data.message 
           : err.response.data,
          }));

    }

    setValidated(true);
  };

    useEffect(()=>{
         let categoryofEditedProduct = categories.find(
          (item)=> item.name === product.category
          );
         if(categoryofEditedProduct){
          const mainCategoryofEditedProduct = 
          categoryofEditedProduct.name.split("/")[0];
          
          const mainCategoryofEditedProductAllData = categories.find(
            (categoryofEditedProduct) => categoryofEditedProduct
            .name === mainCategoryofEditedProduct
          );
          if(mainCategoryofEditedProductAllData &&
             mainCategoryofEditedProductAllData.attrs.length > 0
             ){
             setAttributesFormDb(mainCategoryofEditedProductAllData.attrs);
          

          }
         }
         setCategoryChoosen(product.category);
         setAttributesTable(product.attrs);

        },[product])




const attributeValueSelected = (e) => {
  if(e.target.value !== "Choose attribute value"){
     setAttributesTableWrapper(attrKey.current.value, e.target.value,setAttributesTable);

  }


}



const deleteAttribute = (key) =>{
  setAttributesTable((table) => table.filter((item) => item.key !== key));
}




const checkKeyDown = (e) => {
  if(e.code === "Enter") e.preventDefault();
}

const newAttrKeyHandler = (e) =>{
  e.preventDefault();
  setNewAttrKey(e.target.value);
  addNewAttributeManually(e);
}

const newAttrValuKeyHandler = (e) =>{
  e.preventDefault();
 setNewAttrValue(e.target.value);
 addNewAttributeManually(e);
}

const addNewAttributeManually = (e) =>{
  if(e.keyCode && e.keyCode === 13){
    reduxDispatch(saveAttributeToCatDoc(newAttrKey,newAttrValue,categoryChoosen))
    if(newAttrKey && newAttrValue){
     setAttributesTableWrapper(newAttrKey, newAttrValue,setAttributesTable)
      e.target.value="";
      createNewAttrKey.current.value ="";
      createNewAttrVal.current.value="";
      setNewAttrKey(false);
      setNewAttrValue(false);
    }
  }
}

    return (
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col md={1}>
            <Link to="/admin/products" className="btn btn-info my-3">
              Go Back
            </Link>
          </Col>
          <Col md={6}>
            <h1>Edit product</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}
            onKeyDown={(e) => checkKeyDown(e)}
            >
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required type="text" defaultValue={product.name} />
              </Form.Group>
  
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  required
                  as="textarea"
                  rows={3}
                  defaultValue={product.description}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCount">
                <Form.Label>Count in stock</Form.Label>
                <Form.Control name="count" required type="number" defaultValue={product.count} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" required type="text" defaultValue={product.price} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>
                  Category   
                </Form.Label>
                <Form.Select
                  required
                  name="category"
                  aria-label="Default select example"
                 onChange={(e) => changeCategory(e,categories,
                  setAttributesFormDb,
                  setCategoryChoosen
                  )}
               >
                  <option value="Choose category">Choose category</option>
                 {categories.map((category ,idx)=>{
                     return product.category === category.name ? (
                      <option  selected key={idx}  value={categories.name}>
                      {category.name}
                  </option>
                     ):(
                      <option key={idx} value={categories.name}>
                      {category.name}
                  </option>
                     )
                    
  })}
                </Form.Select>
              </Form.Group>
  
                {attributeFromDb.length > 0 &&(
               <Row className="mt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicAttributes">
                    <Form.Label>Choose atrribute and set value</Form.Label>
                    <Form.Select
                      name="atrrKey"
                      aria-label="Default select example"
                      ref={attrKey}
                      onChange={(e)=>setValuesForAttrFromDbSelectForm(e,attrVal,attributeFromDb)}
                    >
                      <option>Choose attribute</option>
                      {attributeFromDb.map((item,idx) => (
                      <Fragment key={idx}>
                        <option value={item.key}>{item.key}</option>
                      </Fragment>
                    
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Select
                      name="atrrVal"
                      aria-label="Default select example"
                      ref={attrVal}
                      onChange={attributeValueSelected}
                    
                    >
                      <option>Choose attribute value</option>
                     
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
                )}
            
  
              <Row>
                {attributesTable && attributesTable.length > 0 &&(
                  <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attributesTable.map((item,idx)=>(
                   <tr key={idx}>
                    <td>{item.key}</td>
                      <td>{item.value}</td>
                      <td>
                      <CloseButton onClick={()=>deleteAttribute(item.key)} />
                      </td>
</tr>
                    ))}
                   
                  </tbody>
                </Table>
                )}
                
              </Row>
  
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                    <Form.Label>Create new attribute</Form.Label>
                    <Form.Control
                    ref={createNewAttrKey}
                      disabled={categoryChoosen === "Choose category"}
                      placeholder="first choose or create category"
                      name="newAttrkey"
                      type="text"
                      onKeyUp={newAttrKeyHandler}
                      required={newAttrValue}
                
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicNewAttributeValue"
                  >
                    <Form.Label>Attribute value</Form.Label>
                    <Form.Control
                    ref={createNewAttrVal}
                      disabled={categoryChoosen === "Choose category"}
                      placeholder="first choose or create category"
                      required={newAttrKey}
                      name="newAttrValue"
                      type="text"
                      onKeyUp={newAttrValuKeyHandler}
                
                    />
                  </Form.Group>
                </Col>
              </Row>
  
              <Alert show={newAttrKey && newAttrValue} variant="primary">
                After typing attribute key and value press enterr on one of the
                field
              </Alert>
  
              <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
                <Form.Label>Images</Form.Label>
                  <Row>
                    {product.images && 
                    product.images.map((image,idx) =>(
                     <Col key={idx} style={{position: "relative"}} xs={3}>
                    <Image crossOrigin="anonymous"
                     src={image.path ?? null}
                      fluid />
                    <i style={onHover} onClick={() => imageDeleteHandler(image.
                      path, id).then(data => setImageRemoved(!imageRemoved))}
                       className="bi bi-x text-danger">X</i>
                  </Col>
                    ))}
                    
                
                      
                  </Row>
                <Form.Control type="file" multiple onChange={e => {
                  setIsUploading("upload files in progress ...");
                  if(process.env.NODE_ENV !== "production"){
                         // to do : change to !==
                  uploadImagesApiRequest(e.target.files,id)
                  .then(data => {
                    setIsUploading("upload file completed");
                    setImageUploaded(!imageUploaded);
                  })
                  .catch((err)=> setIsUploading(err.response.data.message ? err.response.data.message : err.response));
                }else{
                  uploadImagesCloudinaryApiRequest(e.target.files, id);
                  setIsUploading("upload file completed. wait for the result take effect, refresh also if neccassry");
                  setTimeout(()=> {
                      setImageUploaded(!imageUploaded);
                  }, 5000)
                }
                }} />

              
               
                
  
              </Form.Group>
              <Button variant="primary" type="submit">
                UPDATE
              </Button>
         
               {updateProductResponseState.error ?? ""}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default EditProductPageComponent;
  
  