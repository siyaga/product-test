
const db = require('../models');
var bcrypt = require('bcrypt');

const config = require('../config');
const jwt = require('jsonwebtoken');

const UserDetail = db.userdetails;
const Op = db.Sequelize.Op;

const createUserDetail = async (req, res) => {
  let image = req.files[0].filename;
  let userdetail = {
     user_id: req.body.user_id,
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     address: req.body.address,
     gender: req.body.gender,
     image: image
    }
    UserDetail.create(userdetail)
        .then(() => {
          res.status(200).send({
            message: "create user is successfully ",
            data:userdetail
            
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to Insert data into database!",
            error: error.message,
          });
        });

  
};

const getUserDetail = async (req, res) => {
     
  UserDetail.findAll()
  .then(userdetail => {
      if (userdetail.length === 0) {
        

        res.send({
          message: "no user detail data"
        });
      } else {
        
        res.send({userdetail});
      }
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: "No User Detail Data"
      });
    });
    
  };

  const updateUserDetail = async (req, res) => {
let id = req.params.id;
let image = req.files[0].filename;
let userdetail = {
  user_id: req.body.user_id,
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   address: req.body.address,
   gender: req.body.gender,
   image: image
}
UserDetail.update(userdetail, {
    where: {
      id: id
    }
  })
  .then(data => {
    res.send({message: "Update Product is successfully"});
  })
  .catch(err => {
    res.json({
      info: "Error",
      message: err.message
    })
  });
      };
const deleteUserDetail = async (req, res) => {
  let id = req.params.id;
  UserDetail.destroy({
      where: {
        id: id
      }
    })
    .then(userdetail => {
      if (userdetail) {
        res.send({Message : "UserDetail Has been Deleted"});
      } else {
        res.status(404).send({
          message: "not found UserDetail id=" + id
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
   createUserDetail,
    getUserDetail,
    updateUserDetail,
    deleteUserDetail
  };