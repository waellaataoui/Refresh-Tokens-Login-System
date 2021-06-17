export default (sequelize, DataTypes) => {
  const updateRequest = sequelize.define(
    'updateRequest',
    {
      id: {
        type: DataTypes.STRING(),
        allowNull: false,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
  return updateRequest;
};
