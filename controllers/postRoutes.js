const { Model } = require('sequelize');
const sequelize = require('../config/connect');

class Post extends Model {} 

Post.init(
  {
    author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      },
  },
  {
    sequelize,
    modelName: 'Post', 
  }
);


module.exports = Post;