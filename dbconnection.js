const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DBNAME,process.env.USERNAME,process.env.PASSWORD, {
  host:process.env.HOST,
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate().then(async () => {
      // await sequelize.sync({ alter: true });
      console.log("DB connection successsful");
    });
  } catch (error) {
    console.log("failed", error);
  }
};

module.exports = {
  connection: connection,
  sequelize: sequelize,
};
