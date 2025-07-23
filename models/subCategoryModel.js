module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "subCategories",
    {
      ...require("./core")(Sequelize, DataTypes),
      categoryId:{
      type:DataTypes.UUID,
      allowNull:true,
      references:{
        model:"categories",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
      images:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      itemName:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      price:{
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      quantity:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      information:{
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "subCategories",
    }
  );
};
