const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
  return sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
};
