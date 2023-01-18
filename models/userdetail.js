module.exports = (sequelize, Sequelize) => {
    const Userdetails = sequelize.define("userdetails", {
        user_id: {
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        address:{
            type: Sequelize.TEXT

        },
        gender:{
            type: Sequelize.STRING

        },
        image:{
            type: Sequelize.STRING

        },
    }, {
        
        paranoid:true,
        deleteAt: 'destroyTime'
    });
    return Userdetails;
};