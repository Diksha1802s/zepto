module.exports = (Sequelize, DataTypes, sequelize) => {
  return sequelize.define(
    "cart",
    {
      ...require("./core")(Sequelize, DataTypes),
      subCategoryId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "subCategories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      tableName: "cart",
    }
  );
};
