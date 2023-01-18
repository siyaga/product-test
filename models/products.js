module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
        user_id: {
            type: Sequelize.INTEGER
        },
        name_product: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
        }, 
        description: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
       
    }, {
        
        paranoid:true,
        deleteAt: 'destroyTime'
    });
    return Products;
};