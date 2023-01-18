const db = require('../models');
var bcrypt = require('bcrypt');

const config = require('../config');
const jwt = require('jsonwebtoken');

const Product = db.products;
const Op = db.Sequelize.Op;

const createProduct = async (req, res) => {
     let image = req.files[0].filename;
      let product = {
         user_id: req.body.user_id,
         name_product: req.body.name_product,
         price: req.body.price,
         description: req.body.description,
         image: image
        }
        Product.create(product)
            .then(() => {
              res.status(200).send({
                message: "Create Product is successfully ",
                data:product
                
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to Insert data into database!",
                error: error.message,
              });
            });
  
      
    };

    const getProduct = async (req, res) => {
     
        Product.findAll()
        .then(produck => {
            if (produck.length === 0) {
              
      
              res.send({
                message: "no product data"
              });
            } else {
              
              res.send({produck});
            }
          })
          .catch(err => {
            res.json({
              info: "Error",
              message: "no product"
            });
          });
          
        };

        const updateProduct = async (req, res) => {
    let id = req.params.id;
    let image = req.files[0].filename;      
    let product = {
        user_id: req.body.user_id,
         name_product: req.body.name_product,
         price: req.body.price,
         description: req.body.description,
         image: image
      }
      Product.update(product, {
          where: {
            id: id
          }
        })
        .then(data => {
          res.send({
            message: "Update Product is successfully",
            data:product
        });
        })
        .catch(err => {
          res.json({
            info: "Error",
            message: err.message
          })
        });
            };
    const deleteProduct = async (req, res) => {
      id = req.params.id;
        Product.destroy({
            where: {
              id: id
            }
          })
          .then(product => {
            if (product) {
              res.send({Message : "product Has been Deleted"});
            } else {
              res.status(404).send({
                message: "not found product id=" + id
              })
            }
          })
          .catch(err => {
            res.json({
              info: "Error",
              message: err.message
            })
          });
   
            };
    module.exports = {
        createProduct,
        getProduct,
        updateProduct,
        deleteProduct
    };