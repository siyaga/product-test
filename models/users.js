module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    }, {
        
        paranoid:true,
        deleteAt: 'destroyTime'
    });

    return Users;
};