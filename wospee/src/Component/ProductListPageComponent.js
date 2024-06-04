import { Row, Col, Container, ListGroup, Button } from "react-bootstrap";
import PaginationComponent from "../Component/PaginationComponent";
import ProductForListComponent from "../Component/ProductForListComponent";
import SortOptionsComponent from "../Component/SortOptionsComponent";
import PriceFilterComponent from "../Component/filterQueryComponents/PriceFilterComponent";
import RatingFilterComponent from "../Component/filterQueryComponents/RatingFilterComponent";
import CategoryFilterComponent from "../Component/filterQueryComponents/CategoryFilterComponent";
import AttributesFilterComponent from "../Component/filterQueryComponents/AttributesFilterComponent";
import axios from "axios";
import { useEffect  , useState} from "react";
import { useParams , useLocation, useNavigate } from "react-router-dom";
import MetaComponent from "./MetaComponent";


const ProductListPageComponent = ({getProducts,categories }) => {
//   axios.get("/api/products").then((res) => {
//     console.log(res)
//   }) getProducts

 const [products, SetProducts] = useState([]);
 const [loading , setLoading] = useState(true);
 const [error , setError] = useState(false);
 const [attrFilter , setAttrsFilter] = useState([]);// collect category attributes from db and show on the webpage
 const [attrsFormFilter , setAttrsFromFilter] = useState([]);
 const [showResetFiltersButton , setShowResetFiltersButton] = useState(false);
const [filter, SetFilters] = useState({});
const [Price , setPrice] = useState(500);
const [ratingFormFilter , setRatingsFromFilter] = useState({});
const [categoriesFormFilter , setCategoriesFormFilter] = useState({});
console.log(attrsFormFilter);
const [sortOption, setSortOption] = useState("");
const [paginationLinksNumber, setPaginationLinksNumber] = useState(null);
const [pageNum, setPageNum] = useState(null);

 const {categoryName} = useParams() || "";
 const { pageNumParam } = useParams() || 1;
 const { searchQuery } = useParams() || "";
 const location = useLocation();
 const navigate = useNavigate();


useEffect(()=>{
  if(categoryName){
    let categoryAllData = categories.find(
      (item) => item.name === categoryName.replace(/,/g,"/"));
    console.log(categoryAllData,"CATE");
    if(categoryAllData){
      let mainCategory = categoryAllData.name.split("/")[0];
      let index = categories.findIndex((item) => item.name === mainCategory);
      setAttrsFilter(categories[index].attrs);
    }
  }else{
    setAttrsFilter([]);
  }
},[categoryName,categories])








useEffect(()=> {
if(Object.entries(categoriesFormFilter).length > 0){
  setAttrsFilter([]);
  var cat = [];
  var count;
  Object.entries(categoriesFormFilter).forEach(([category, checked]) => {
    if(checked){
      var name = category.split("/")[0];
      cat.push(name);
      count = cat.filter((x)=> x === name).length;
      if(count === 1){
        var index = categories.findIndex((item) => item.name === name);
        setAttrsFilter((attrs) => [...attrs, ...categories[index].attrs]);
      }
    }
  })
}
},[categoriesFormFilter, categories])





 useEffect(()=>{
  getProducts(categoryName, pageNumParam, searchQuery, filter, sortOption)
  .then((product) =>{
  
    SetProducts(product.product)
    setPaginationLinksNumber(product.paginationLinksNumber);
  
    setPageNum(product.pageNum);
    setLoading(false);
  
    console.log(filter,"Filters");
  }).catch((er)=> {
    console.log(er)
   setError(true)
  console.log(filter);
  }
 
)

},[filter,categoryName,pageNumParam, searchQuery,sortOption])
// 
const handleFilter = () => {
  navigate(location.pathname.replace(/\[0-9]+$/,""))
  setShowResetFiltersButton(true);
  SetFilters({
    price:Price,
    rating:ratingFormFilter,
    category: categoriesFormFilter,
    attrs:attrsFormFilter,
  })
 
}

 const resetFilters = () => {
  setShowResetFiltersButton(false);
  setAttrsFilter({});
  window.location.href = "/product-list";
 }
console.log(sortOption,"sort");
  return (
    <>

    <MetaComponent title={products.name} description={products.description}/>
    <Container fluid>
      <Row>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item className="mb-3 mt-3">
              <SortOptionsComponent  setSortOption={setSortOption}/>
            </ListGroup.Item>
            <ListGroup.Item>
              FILTER: <br />
              <PriceFilterComponent  price={Price} setPrice={setPrice}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <RatingFilterComponent setRatingsFromFilter={setRatingsFromFilter} />
            </ListGroup.Item>
            {!location.pathname.match(/\/category/) && (
                <ListGroup.Item>
                <CategoryFilterComponent setCategoriesFormFilter={setCategoriesFormFilter}/>
              </ListGroup.Item>
            )}
            
            <ListGroup.Item>
              <AttributesFilterComponent attrFilter={attrFilter}
              setAttrsFromFilter={setAttrsFromFilter}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="primary" onClick={handleFilter}>Filter</Button>
              {showResetFiltersButton && (
                             <Button onClick={resetFilters}  variant="danger">Reset filters</Button>
              )}

            </ListGroup.Item> 
          </ListGroup>
        </Col>
        <Col md={9} p={4} >
          {products.map((product) => 
            <ProductForListComponent
               
              key={product._id}
              images={product.images}
            name={product.name}
            description={product.description}
            price={product.price}
            rating={product.rating}
            reviewsNumber={product.reviewsNumber}
            productId={product._id}
            />
          )}
            {paginationLinksNumber > 1 ? (
            <PaginationComponent
              categoryName={categoryName}
              searchQuery={searchQuery}
              paginationLinksNumber={paginationLinksNumber}
              pageNum={pageNum}
            />
          ) : null}
        </Col>
      
      </Row>
    </Container>
    </>
  );
};

export default ProductListPageComponent;

