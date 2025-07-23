module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define("cms", {
    title:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    description:{
      type:DataTypes.STRING(100),
      allowNull:false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false.valueOf,
      comment:"0 means about us 1 means open source licenses  2 means terms and conditions"
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
  },{
    tableName:"cms"
  });
};
