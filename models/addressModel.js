module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "address",
    {
      ...require("./core")(Sequelize, DataTypes),
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      houseNo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      buildingNo: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      landmark: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      recieverName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      addressLabelType:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        comment:"0 for office 1 for work 2 for other"
      },
      addressLabel:{
        type:DataTypes.STRING(100),
        allownull:true,
      }
      
    },
    {
      tableName: "address",
    }
  );
};
