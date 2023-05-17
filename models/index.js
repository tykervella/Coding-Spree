const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')

// A user can have many post
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
// A post belongs to a single user
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

  // A comment belongs to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

//But a post has many comments 
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
})

//comments belong to one user 
Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

//but users have many comments 
User.hasMany(Comment, {
foreignKey: 'user_id',
onDelete: 'CASCADE'
})

module.exports = { User, Post, Comment };
