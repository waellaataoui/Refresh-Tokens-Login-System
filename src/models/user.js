import bcrypt from 'bcrypt';
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
      },
    },
    { freezeTableName: true }
  );
  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 8);
  });
  User.beforeUpdate(async user => {
    if (user.changed('password'))
      user.password = await bcrypt.hash(user.password, 8);
  });
  return User;
};
