const Product = require("../model/ProductModel")
const recordsPerPage = require("../config/pagination")
const imageValidate = require("../utils/imageValidate")

const getProducts = async (req,res,next) => {
    try{
      console.log(req.query.rating,"REQUEST BACJ");
        let query = {};
        let queryCondition = false

        let priceQueryCondition = {}
        if(req.query.price){
            queryCondition= true;
            priceQueryCondition = {price: {$lte: Number(req.query.price) }};
        }
        let ratingQueryCondition = {};
        if (req.query.rating) {
          console.log("Received ratings: ", req.query.rating);
          queryCondition = true;
          ratingQueryCondition = { rating:
             { $in: req.query.rating.split(",") } };
        }

let categoryQueryCondition = {}
let categoryName = req.params.categoryName || "";

if(categoryName){
    queryCondition = true;
    let a = categoryName.replace(/,/g,"/");
    var regEx = new RegExp("^" + a);
    categoryQueryCondition = {category: regEx};
}

 if(req.query.category){
    queryCondition = true;
    let a = req.query.category.split(",").map((item)=>{
       if(item) return new RegExp("^" + item) 
    });
       categoryQueryCondition = {
        category: {$in:a}
       };
 }


 let attrsQueryCondition = [];

 if (req.query.attrs) {
  // attrs=RAM-1TB-2TB-4TB,color-blue-red
  // [ 'RAM-1TB-4TB', 'color-blue', '' ]
  attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
    if (item) {
      let a = item.split("-");
      let values = [...a];
      values.shift(); // removes first item
      let a1 = {
        attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
      };
      acc.push(a1);
      // console.dir(acc, { depth: null })
      return acc;
    } else return acc;
  }, []);
  //   console.dir(attrsQueryCondition, { depth: null });
  queryCondition = true;
}






 let sort = {}
 const  sortOption = req.query.sort ||""
 if(sortOption){
     let sortOpt = sortOption.split("_")
     sort = {[sortOpt[0]]: Number(sortOpt[1])};
 }


 const searchQuery = req.params.searchQuery || ""
 let searchQueryCondition={};
 let select = {};
 if(searchQuery){
    queryCondition = true
    searchQueryCondition = {$text: {$search: searchQuery}};


    select = {
        score: {$meta: "textScore"}
    }
    sort ={ score: {$meta: "textScore"}}
 }


 if(queryCondition){
    query ={
        $and: [searchQueryCondition,
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
        ...attrsQueryCondition,
        ]
    }
 }

       const pageNum = Number(req.query.pageNum) || 1;
    const totalProducts = await Product.countDocuments({});
    


    // sort by name,price 

  
    
    
    const product = await Product.find(query)
       .select(select)
       .skip(recordsPerPage *(pageNum - 1))
       .limit(recordsPerPage)
       res.json({product,
        pageNum,
        paginationLinksNumber:Math.ceil(totalProducts/ recordsPerPage)
                   
    })
    }catch(err){
           next(err);
    }



    
}



// const getProductById = async (req, res, next) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("reviews")
//       .orFail();
//     res.json(product);
//   } catch (err) {
//     next(err);
//   }
// };





// const getProductById = async (req, res, next) => {
//   try {
//     const productId = req.params.id; // Assuming 'id' is the URL parameter for product ID
//     const product = await Product.aggregate([
//       { $match: { _id: mongoose.Types.ObjectId(productId) } }, // Convert string ID to MongoDB ObjectId
//       {
//         $lookup: {
//           from: "reviews", // Assuming 'reviews' is the name of the collection containing reviews
//           localField: "_id", // Field from the product documents
//           foreignField: "product_id", // Field from the reviews documents referencing product
//           as: "reviews" // The array field where joined documents will be placed
//         }
//       }
//     ]);

//     if (product.length === 0) {
//       throw new Error('Product not found');
//     }

//     res.json(product[0]); // Send the first (and should be only) product found
//   } catch (err) {
//     next(err); // Pass the error to the error-handling middleware
//   }
// };



const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("reviews")
      .orFail();
    res.json(product);
  } catch (err) {
    next(err);
  }
};






const getBestseller = async(req,res,next)=>{
    try{
       const products = await Product.aggregate([
        {$sort:{ category: 1, sales:-1}},
        {$group:{_id:"$category", doc_with_max_sales: {$first:"$$ROOT"}}},
        {$replaceWith: "$doc_with_max_sales"},
        {$match: {sales:{$gt:0}}},
        {$project:{ _id:1, name:1,images:1,category:1, description: 1}}
        ,{$limit:3}
       ])
       res.json(products)
    }catch(err){
         next(err)
    }
}



const adminGetProducts = async (req, res) => {
    try {
     
      const products = await Product.find({})
       .sort({ category: 1 })
       .select("name price category");
        return res.json(products)
       
    } catch (err) {
      //next(err);
    }
  };


const adminDeleteProduct = async (req,res,next)=>{
    try{
        const product = await Product.findById(req.params.id).orFail()
        await product.remove()
        res.json({message:"product removed"})
    }catch(err){
        next(err)
    }
}


// const adminCreateProduct = async(req,res,next)=>{
//     try{
//      const product = new Product()
//      const {name, description, count,price,category,attributesTable} = req.body
//      product.name = name
//      product.description = description
//      product.count = count
//      product.price = price
//      product.category = category
//      if(attributesTable.lenght > 0){
//         attributesTable.map((item)=>{
//             product.attrs.push(item)
//         })
//         await product.save()
//         res.json({
//             message:"product created",
//             productId: product._id
//         }) 
//     }
// }catch(err){
//     console.log(err)
//      next(err)
//     }
// }
const adminCreateProduct = async (req, res, next) => {
    try {
      const product = new Product();
      const { name, description, count, price, category, attributesTable } =
        req.body;
      product.name = name;
      product.description = description;
      product.count = count;
      product.price = price;
      product.category = category;
      if (attributesTable.length > 0) {
        attributesTable.map((item) => {
          product.attrs.push(item);
        });
      }
      await product.save();
  
      res.json({
        message: "product created",
        productId: product._id,
      });
    } catch (err) {
      next(err);
    }
  };

const adminUpdateProduct = async (req,res,next) =>{
    try{
     const product = await Product.findById(req.params.id).orFail()
     const { name, description,count, price,category,attributesTable} = req.body
     product.name = name || product.name
     product.description = description || product.description
     product.count = count || product.count
     product.price = price || product.price
     product.category = category || product.category
     if(attributesTable.lenght > 0){
        product.attrs = []
        attributesTable.map((item)=>{
            product.attrs.push(item)
        })
     }else{
        product.attrs = []
     }
     await product.save()
     res.json({
        message:"product updated"
     })
    }catch(err){
        next(err)
    }
}






// const adminUpload = async (req, res, next) => {
//     try {
//         if(!req.files || !! req.files.images === false) {
//             return res.status(400).send("No files were uploaded.")
//         }
//         if (Array.isArray(req.files.images)) {
//             res.send("You sent " + req.files.images.length + " images")
//         } else {
//             res.send("You sent only one image")
//         }
//     } catch(err) {
//         next(err)
//     }
// }




const adminUpload = async (req, res, next) => {
   
   if(req.query.cloudinary === "true"){

   try {
      let product = await Product.findById(req.query.productId).orFail();
      product.images.push({path:req.body.url});
      await product.save();
     
      
   } catch (err) {
      next(err);
   }

  try {
    let product = await Product.findById(req.query.productId).orFail();
    product.images.push({path: req.body.url});
    await product.save();
    res.send(product); // Sending the updated product back to the client
} catch (err) {
    next(err); // Passing the error to the next error-handling middleware
}
   
    return 
   }


    try {
        if(!req.files || !! req.files.images === false) {
            return res.status(400).send("No files were uploaded.")
        }

        const validateResult = imageValidate(req.files.images)
        if(validateResult.error) {
            return res.status(400).send(validateResult.error)
        }

        const path = require("path")
        const { v4: uuidv4 } = require("uuid")
        const uploadDirectory = path.resolve
        (__dirname, 
        "../../wospee",
         "public",
          "images",
        "products")

        let product = await Product.findById(req.query.productId).orFail()

        let imagesTable = []
        if (Array.isArray(req.files.images)) {
            imagesTable = req.files.images
        } else {
            imagesTable.push(req.files.images)
        }

        for(let image of imagesTable) {
            var fileName = uuidv4() + path.extname(image.name);
            var uploadPath = uploadDirectory + "/" + fileName
            product.images.push({ path: "/images/products/" + fileName})
            image.mv(uploadPath, function(err) {
                if(err) {
                    return res.status(500).send(err)
                }
            })
        }
        await product.save()
        return res.send("Files uploaded!")

    } catch(err) {
        next(err)
    }
}



// const adminDeleteProductImage = async (req, res, next) => {
//     try {
//       console.log("Data coming");
//         const imagePath = decodeURIComponent(req.params.imagePath);
//       const path = require("path");
//       const finalPath = path.resolve("../frontend/public") + imagePath;
  
//       const fs = require("fs");
//       fs.unlink(finalPath, (err) => {
//         if (err) {
//           res.status(500).send(err);
//         }
//       });
//       await Product.findOneAndUpdate(
//         { _id: req.params.productId },
//         { $pull: { images: { path: imagePath } } }
//       ).orFail();
//       return res.end();
//     } catch (err) {
//       next(err);
//     }
//   };

const adminDeleteProductImage = async (req, res, next) => {
  const imagePath = decodeURIComponent(req.params.imagePath); 

  if(req.query.cloudinary === "true"){
    try {
       await Product.findOneAndUpdate({_id: req.params.productId},{
        $pull:{images:{path:imagePath}}
       }).orFail();
       return res.end();
    } catch (err) {
      next(err)
    }
    return
  }
   
  try {
  
    const path = require("path");
    const finalPath = path.resolve("../wospee/public") + imagePath;

    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await Product.findOneAndUpdate(
      { _id: req.params.productId },
      { $pull: { images: { path: imagePath } } }
    ).orFail();
    return res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {getProducts,adminUpload,adminCreateProduct,adminDeleteProductImage ,adminUpdateProduct,adminDeleteProduct,getProductById,getBestseller,adminGetProducts};
