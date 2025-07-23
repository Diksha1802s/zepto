module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "orders",
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
      cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "cart",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      amount:{
        type:DataTypes.DOUBLE,
        allowNull:true,
      },
      orderStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        comment: "0 for pending 1 for accept",
      },
    },
    {
      tableName: "orders",
    }
  );
};
