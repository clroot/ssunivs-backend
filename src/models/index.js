import User from './user';
import Board from './board';

/**
 * create or alter all models
 * @function
 * */
export const syncAllModel = async () => {
  try {
    // Associate models
    User.hasMany(Board, {
      foreignKey: 'writer_id',
    });
    Board.belongsTo(User, {
      as: 'writer',
      foreignKey: 'writer_id',
    });

    // Synchronize models
    await User.sync({ alter: true });
    await Board.sync({ alter: true });
  } catch (e) {
    if (process.env.NODE_ENV !== 'test') return Promise.reject(e);
  }
};

export { default as Board } from './board';
export { default as User, Role as UserRole } from './user';
