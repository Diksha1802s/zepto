module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define("rating", {
    ...require("./core")(Sequelize, DataTypes),
    providerId:{
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
    userId:{
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },{
    tableName:"rating"
  });
};
