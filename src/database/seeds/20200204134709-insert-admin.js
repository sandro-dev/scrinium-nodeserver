const bcrypt = require('bcryptjs');

module.exports = {
  up: async queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Administrador',
        email: 'admin@gabinete.com',
        password_hash: await bcrypt.hash('123456', 8),
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users');
  },
};
