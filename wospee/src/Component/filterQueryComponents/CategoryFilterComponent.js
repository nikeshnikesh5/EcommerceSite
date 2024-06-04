import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import {useSelector} from "react-redux"
const CategoryFilterComponent = ({setCategoriesFormFilter}) => {
  
     const {categories} = useSelector((state) => state.getCategories);
     const myRefs = useRef([]);

     const [selectedCategories, setSelectedCategories] = useState([]);
     const selectCategory = (e, category, idx) => {
      setCategoriesFormFilter((items) => {
        return { ...items, [category.name]: e.target.checked };
      });
  

  var selectMainCategory = category.name.split("/")[0];
  console.log(selectMainCategory);

  var allCategories = myRefs.current.map((_,id) =>{
    return { name : categories[id].name , idx:id};
  });

  var indexsOfMainCategory = allCategories.reduce((acc, item)=>{
    var cat = item.name.split("/")[0];
    if(selectMainCategory === cat){
      acc.push(item.idx);
    }
    return acc;
  },[])
   console.log(indexsOfMainCategory)

   if(e.target.checked){
    setSelectedCategories((old) => [...old, "cat"]);
    myRefs.current.map((_,idx)=>{
      if(!indexsOfMainCategory.includes(idx)) myRefs.current[idx].disabled= true;
      return"";
    
    })
   } else{
      setSelectedCategories((old) => {
        var a = [...old];
        a.pop();
        if(a.length === 0){
          window.location.href = "/product-list";
        }
        return a;
      })
        myRefs.current.map((_,idx2) =>{
          if(allCategories.length === 1){
            if(idx2 !== idx) myRefs.current[idx2].disabled = false;

          }else if (selectedCategories.length === 1){
            myRefs.current[idx2].disabled = false;
            return "";
          }
        })    
       
   }
};



  return (
    <>
      <span className="fw-bold">Category</span>
      <Form>
        {categories.map((category, idx) => (
          <div key={idx}>
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input ref={(el) => (myRefs.current[idx] = el)} type="checkbox" isValid onChange={(e)=>{selectCategory(e, category , idx)}}/>
              <Form.Check.Label style={{ cursor: "pointer" }}>
              {category.name}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilterComponent;
