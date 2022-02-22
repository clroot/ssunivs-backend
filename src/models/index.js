import User from './user';
import Post from './post';
import PickUp from './PickUp';

/**
 * create or alter all models
 * @function
 * */
export const syncAllModel = async () => {
  try {
    // Associate models
    User.hasMany(Post, {
      foreignKey: 'writer_id',
    });
    User.hasMany(PickUp, {
      foreignKey: 'user_id',
    });
    Post.belongsTo(User, {
      as: 'writer',
      foreignKey: 'writer_id',
    });
    PickUp.belongsTo(User, {
      as: 'user',
      foreignKey: 'user_id',
    });


    // Synchronize models
    await User.sync({ alter: true });
    await Post.sync({ alter: true });
    await PickUp.sync({ alter: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') return Promise.reject(e);
  }
};

export { default as Post } from './post';
export { default as User, Role as UserRole } from './user';
export { default as PickUp } from './PickUp';