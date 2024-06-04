

export const changeCategory =(e,
    categories ,
  setAttributesFormDb,
  setCategoryChoosen,
  ) =>{
    const highLevelCategory = e.target.value.split("/")[0];
    const highLevelCategoryAllData = categories.find((cat) => cat.name === highLevelCategory);
    if(highLevelCategoryAllData && highLevelCategoryAllData.attrs){
      setAttributesFormDb(highLevelCategoryAllData.attrs);
    }else{
      setAttributesFormDb([]);
    }
    setCategoryChoosen(e.target.value)
  }



export  const setValuesForAttrFromDbSelectForm = (e , attrVal , attributeFromDb) => {
    if(e.target.value !== "Choose attribute"){
      var selectedAttr = attributeFromDb.find((item) => 
      item.key === e.target.value);
       let valueForAttrKeys = attrVal.current;
       if(selectedAttr && selectedAttr.value.length > 0){
        while(valueForAttrKeys.options.length){
          valueForAttrKeys.remove(0)
        }
        valueForAttrKeys.options.add(new Option("Choose attribute value"))
        selectedAttr.value.map(item => {
          valueForAttrKeys.add(new Option(item));
          return "";
        })
       }
  
  
  
    }
  
   }



   export const setAttributesTableWrapper = (key,val,setAttributesTable) => {

    setAttributesTable((attr) =>{
      if(attr.length !== 0){
       var keyExistsInoldTable = false;
       let modifiedTable = attr.map(item => {
        if(item.key === key){
          keyExistsInoldTable = true;
          item.value = val;
          return item;
        }else{
          return item
        }
       })
       if(keyExistsInoldTable) return [...modifiedTable]
       else return [...modifiedTable, {key:key , value:val}];
  
      }else{
        return [{key:key ,value:val}]
      }
    })
  }