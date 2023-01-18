const { Sequelize, DataTypes, Model } = require('sequelize');
//  driver sqlite
// const sequelize = new Sequelize('sqlite::memory:');

// sql server
const sequelize = new Sequelize('product', 'postgres', 'lifeforme', {
    dialect: 'postgres',
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      clientMinMessages: 'ignore' // case insensitive
    },
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// tabelnya
db.products = require('./products')(sequelize, Sequelize);
db.userdetails = require('./userdetail')(sequelize, Sequelize);
db.users = require('./users')(sequelize, Sequelize);

db.products.belongsTo(db.users, {foreignKey:'user_id'});
db.userdetails.belongsTo(db.users, {foreignKey:'user_id'});


module.exports = db;