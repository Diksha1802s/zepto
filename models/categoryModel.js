module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "categories",
    {
      ...require("./core")(Sequelize, DataTypes),
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      image:{
        type: DataTypes.STRING(100),
        allowNull: true,
      }
    },
    {
      tableName: "categories",
    }
  );
};
