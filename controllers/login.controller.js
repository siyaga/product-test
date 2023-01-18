const db = require('../models');
const bcrypt = require('bcrypt');

const config = require('../config');
const jwt = require('jsonwebtoken');

const Users = db.users;
const Op = db.Sequelize.Op;

const login = async (req, res) => {
    Users.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(data => {
        
        if (data) {
          let loginValid = bcrypt.compareSync(req.body.password, data.password);
          if (loginValid) {
            // JWT Authentication
            let payload = {
              userid: data.id,
              email: req.body.email
            };
            // let token = jwt.sign(
            //   payload,
            //   config.secret, {
            //     expiresIn: '12h'
            //   }
  
            // )

            let token = jwt.sign(
              payload,
              "secretkey",
              { expiresIn: "12h" },
              (err, token) => res.cookie('auth', token).json({ token })
            );
            
            let dt = new Date();
            dt.setHours(dt.getHours() + 12);
          return   token
          // return  res.json({
          //     success: true,
          //     token: token,
          //     expired: dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString()
          //   });
          } else {
            return  res.json({
              message: "email and password worng"
            })
          }
  
        } else {
          return res.json({
            message: "email tidak di temukan"
          });
        }
      })
      .catch(err => {
        return   res.json({
          message: "Error"
        });
      });
  

}


const register = async (req, res, next) => {

  let passwordHash = bcrypt.hashSync(req.body.password, 10);
  let user = {
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: passwordHash
  }
 
  Users.create(user)
    .then(data => {
      res.send({
        message: "Berhasil Registrasi"
        
      });
    })
    .catch(err => {
      res.json({
        info: "Error",
        message: err.message
      });
    });
    
  
}

const getUser = async (req, res) => {
     
    Users.findAll(
        { attributes: ['id', 'email', 'phone_number']}
    )
    .then(user => {
        if (user.length === 0) {
          
  
          res.send({
            message: "data user not found"
          });
        } else {
          
          res.send({user});
        }
      })
      .catch(err => {
        res.json({
          info: "Error",
          message: "no user found"
        });
      });
      
    };


const logout = async (req, res, next) =>{
    req.session.destroy();
  
  }


module.exports = {
    login,
    register,
    logout,
    getUser
  };