const Sequelize = require("sequelize")

const sequelizedataBase = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/dbWebII.sqlite',
    logging: false
});

(async () => 
{
    await sequelizedataBase.authenticate();
    await sequelizedataBase.sync({force:false});
}) ();

module.exports = sequelizedataBase;
