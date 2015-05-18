/**
* Inventory.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      boat: {
              type: 'string',
              required: true
          },
      title:{
          type: 'string',
          required: false
      },
          date: {
              type: 'DATE',
              required: true
          },
          time: {
              type: 'string',
              required: true
          }
      //,      details:{
      //    type:'array',
      //    required: true
      //}
  },
    getAll: function() {
        return Inventory.find()
            // Inventory: sort by createdAt DESC does not work here
            //.sort('title')
       //     .populate('user')
            .then(function (models) {
                return [models];
            });
    },
    getOne: function(id) {
        return Inventory.findOne(id)
          //  .populate('user')
            .then(function (model) {
                // you have the option to do something with the model here if needed, before returning it to the controller
                return [model];
            });
    }

};

