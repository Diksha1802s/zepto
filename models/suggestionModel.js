module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "suggestions",
    {
      ...require("./core")(Sequelize, DataTypes),
      userId:{
      type:DataTypes.UUID,
      allowNull:true,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
      suggestion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "suggestions",
    }
  );
};
