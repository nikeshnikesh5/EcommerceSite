const express = require('express')
const router = express.Router()

const{ getProductById,adminUpdateProduct,adminDeleteProduct,adminDeleteProductImage ,adminGetProducts,getProducts,getBestseller, adminCreateProduct,adminUpload} = require('../controller/productController')

const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts)
router.get("/search/:searchQuery", getProducts)
router.get("/", getProducts)
router.get("/bestsellers", getBestseller)
router.get("/get-one/:id", getProductById)

// admin routes:
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.get("/admin", adminGetProducts)
router.delete("/admin/:id", adminDeleteProduct)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)
router.put("/admin/:id", adminUpdateProduct)
router.post("/admin/upload", adminUpload)
router.post("/admin", adminCreateProduct)



module.exports = router