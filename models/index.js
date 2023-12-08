const User = require('./User');
const Post = require ('./Post');

Post.belongsTo(User, {
    foreignKey:'userId'
})

User.hasMany(Post, {
    foreignKey:'userId',
    onDelete: 'CASCADE'
})

module.exports = { User, Post };