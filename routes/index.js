var express = require('express');
const passport = require('passport');
var router = express.Router();
const upload = require("../middleware/upload");

const jwt = require('jsonwebtoken');
const userController = require("../controllers/user.controller");
const productController = require("../controllers/product.controller");
const loginController = require("../controllers/login.controller");

//Login
router.post('/login', loginController.login);
router.post('/register', loginController.register);
/* logout. */
router.get('/logout', loginController.logout);

router.get('/user', loginController.getUser);

// Product
router.post('/products/create', upload.array('image',1), productController.createProduct);
router.get('/products',productController.getProduct);
router.put('/products/:id', upload.array('image',1), productController.updateProduct)
router.delete('/products/delete/:id', productController.deleteProduct)


// user
router.post('/userdetail/create', upload.array('image',1), userController.createUserDetail);
router.get('/userdetail',userController.getUserDetail);
router.put('/userdetail/:id', upload.array('image',1), userController.updateUserDetail)
router.delete('/userdetail/delete/:id', userController.deleteUserDetail)



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({sucess: "success"});
});

module.exports = router;
