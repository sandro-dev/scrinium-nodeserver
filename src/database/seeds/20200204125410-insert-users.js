const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Sandro Santos',
        email: 'sandro1@gmail.com',
        password_hash: await bcrypt.hash('123456', 8),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Sandro Silva',
        email: 'sandro2@gmail.com',
        password_hash: await bcrypt.hash('123456', 8),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users');
  },
};
