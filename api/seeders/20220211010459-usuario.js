'use strict';

module.exports = {
  
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('usuarios', [{
        cuenta: 'facebook',
        nombre: 'Dario',
        pass: 1234,
        rol_id:1,
       
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
    }
}

 

