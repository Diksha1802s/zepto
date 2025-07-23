module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "subscription",
    {
      ...require("./core")(Sequelize, DataTypes),
      title: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      amount:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      type:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:"0 for monthly 1 for yearly"
      }
    },
    {
      tableName: "subscription",
    }
  );
};
