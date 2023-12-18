// En tu archivo models/User.js
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            User.hasOne(models.Address, {
                as: 'address',
                foreignKey: 'userId',
            });

            User.hasMany(models.Order, {
                as: 'orders',
                foreignKey: 'userId',
            });
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );

    return User;
};
