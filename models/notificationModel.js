module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define("notifications", {
    ...require("./core")(Sequelize, DataTypes),
    senderId:{
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
    recieverId:{
      type:DataTypes.UUID,
      allowNull:false,
      references:{
        model:"users",
        key:"id"
      },
      onUpdate:"CASCADE",
      onDelete:"CASCADE"
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    message: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },{
    tableName:"notifications"
  });
};
