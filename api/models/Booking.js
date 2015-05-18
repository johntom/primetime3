module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true
		},
        date: {
            type: 'DATE',
            required: true
        }
		,
		cdate: {
			type: 'string',
			required: true
		},
		comboday: {
			type: 'string',
			required: true
		},
        time: {
            type: 'string',
            required: true
        },
        status:{
            type: 'string',
            required: false
        },
        max:{
            type: 'INTEGER',
            required: false
        },
		//user: {
		//	model: 'user'
		//}
		boat: {
			model: 'user'
		}
	},


	/**
	* Callback to be run after creating a Message.
	*
	* @param {Object}   message The soon-to-be-created Message
	* @param {Function} next
	*/
	afterCreate: function (hotelling, next) {
		// set message.user = to appropriate user model
        User.getOne(hotelling.user)
		.spread(function(user) {
                hotelling.user = user;
			next(null, hotelling);
		});
	},

	getAll: function() {
       return Hotelling.find()

       // var ddate_str1 = new Date();
       // return Hotelling.find( {"date": {$gte: ddate_str1}})
		// TODO: sort by createdAt DESC does not work here, something to do with a camelCase key names bug
		.sort({createdAt: 'desc'})
		.populate('user') // like a join
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return Hotelling.findOne(id)
		.populate('user')
		.then(function (model) {
			// you have the option to do something with the model here if needed, before returning it to the controller
			return [model];
		});
	}
};
