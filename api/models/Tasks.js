/**
* Tasks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

//
//function getNextSequence(name) {
//  console.log('in na')
//  var ret = counters.findAndModify(
//      {
//        query: { _id: name },
//        update: { $inc: { seq: 1 } },
//        new: true
//      }
//  );
//
//  return ret.seq;
//}
module.exports = {
  adapter: 'someMongodbServer',
  attributes: {
    Start: {
      type: 'date',
      required: false
    },
    End: {
      type: 'date',
      required: false
    }
    //,
    //
    //
    //beforeUpdate: function (tasks, next) {
    //  console.log('in modesls beforeUpdate:: ',tasks)
    //  TaskID: getNextSequence("TaskID")
    //}

  }




};

