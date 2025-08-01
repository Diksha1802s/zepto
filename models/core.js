module.exports = (Sequelize, DataTypes) => {
  return {
    id: {
      type: Sequelize.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(0),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW(0),
    },
  };
};
