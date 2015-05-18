var _ = require('lodash');
var moment = require('moment');

module.exports = {


    findinventory: function(req, res) {
        console.log('in HotellingCtrl.findinventory[',req.body,']');
        Inventory.getAll()
            .spread(function(models) {
                console.log('find ',req.socket.id);//req.socket
                Hotelling.watch(req);
                Hotelling.subscribe(req.socket,models);
                console.log('Hotelling find User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'hotellings\'.',models);
//
//                //Todo.autosubscribe;
//                //res.json(models);
                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },


    find: function(req, res) {
        console.log('in HotellingCtrl.find[',req.body,']');
        Hotelling.getAll()
            .spread(function(models) {
                console.log('find ',req.socket.id);//req.socket
                Hotelling.watch(req);
                Hotelling.subscribe(req.socket,models);
                console.log('Hotelling find User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'hotellings\'.',models);
//
//                //Todo.autosubscribe;
//                //res.json(models);
                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },
    getAlldates: function(req, res) {



        var ddate_str1 = new Date();//'01/04/2014');

        console.log('This is  getAlldates [',req.body,']',ddate_str1);

        //    var VDATE = moment().format("MM/DD/YYYY");

        moment().format('MMMM Do YYYY, h:mm:ss a');
        var dd = moment().format('DD');
        var mm = moment().format('MM')-1;//
        var yyyy = moment().format('YYYY');


        var nstart = new Date(yyyy, mm , dd);

        console.log('get nstart',nstart)
//        db.hotelling.find({"date": {$gte: nstart}})

        //  Hotelling.find( {"status": '0'} )
        //Hotelling.find( {"date": {'$gte': ddate_str1}} )


        //    console.log('get date_str1/2', date_str1, date_str2);

//        var ddate_str1 = new Date(date_str1);//'01/04/2014');
//        var ddate_str2 = new Date(ddate_str1310);//'02/04/2014');
//        console.log('findAllWrapped get ddate_str1/2', ddate_str1, ddate_str2)
        // Po.find( {'POID':{$gt: gtnum } })
        //   Po.find( { "Date": {$gte: date_str1,$lte: date_str2} } )
        //Po.find( {'POID': gtnum  })
        Hotelling.find({ "date": {$gte: nstart} })
//            .sort('POID DESC')
//
//
//        Hotelling.find({"date": {'$gte': nstart}})

            //.spread(function(models) {

            .exec(function (err,models){
                if (err) return next(err);
                console.log('exec::findAllWrapped... ', models.length);//[0]);


                console.log('=========================\n')
                console.log('socket getAlldates ',req.socket.id);//req.socket)
                console.log('=========================models\n',models)
                //Todo.autosubscribe();
                Hotelling.watch(req);
                Hotelling.subscribe(req.socket,models);
                console.log('Hotelling getAll User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'hotellings\'.',models);
                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },

    getAll: function(req, res) {

        var VDATE = moment().format("MM/DD/YYYY")-1;


        //  Hotelling.find({ "date": {$gte: nstart} })
        //db.two.find( { "Date": {$gte: '01/30/2014',$lte: '02/30/2014'}} ).sort({ TWOID: -1 })
        var ddate_str1 = new Date();//'01/04/2014');
        console.log('This is  HotellingCtrl.getAll[',req.body,']',ddate_str1);


        //Hotelling.getAll( {"status": '2'} )// does nothing
        Hotelling.getAll(  )

            .spread(function(models) {
                console.log('=========================\n')
                console.log('socket getAll',req.socket.id);//req.socket)
                console.log('=========================\n',models)
                //Todo.autosubscribe();
                Hotelling.watch(req);
                Hotelling.subscribe(req.socket,models);
                console.log('Hotelling getAll User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'hotellings\'.',models);
                res.json({data: models});
            })
            .fail(function(err) {
                // An error occured
            });
    },

    getOne: function(req, res) {
        Hotelling.getOne(req.param('id'))
            .spread(function(model) {
                Hotelling.subscribe(req.socket, model);
                res.json(model);
            })
            .fail(function(err) {
                res.send(404);
            });
    },

    create: function (req, res) {
        //req.param('title') req.params.all()

        if (req.body.floor === undefined) {
            console.log('resource alreadu used')

            res.send(404);
        }
        else {
            var userId = req.body.user;//.param('user');
            //var hdate = req.body.date;//req.param('date');
            var hdate = new Date(req.body.date);//'01/04/2014');
            var cd1 = moment(hdate).format("MM/DD/YYYY");
            var cd2 = moment(hdate).format("dddd");
            var title = req.body.title;
            console.log('b4 req.body.floor ',req.body.floor)

            var floor = req.body.floor.no;
            var model = {
                title: title,
                date: hdate,
                cdate: cd1,
                comboday: cd1 + ' ' + cd2,
                status: '0',
                floor: floor,
                user: userId
            };
            console.log('b4 create model', model)
            Hotelling.create(model)
                .exec(function (err, model) {
                    if (err) {
                        return console.log(err);
                    }
                    else {

                        Inventory.native(function(err, inventory) {
                            //inventory.update( { cdate:'05/19/2014', location: 'nyc',"details.no":509} , {
                            console.log(  'inventory.update cdate: ',model.cdate,"details.no",model.floor)
                            inventory.update( { cdate:model.cdate, location: 'nyc',"details.no":model.floor} , {
                                $set: {
                                    'details.$.avail':1
                                }
                            }, {multi: false} , function(err, doc) {});
                        });
                        console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model create in \'hotellings\'.');
                        Hotelling.publishCreate(model);
                        res.json(model);
                    }
                });
        }
    },
    update: function (req, res, next) {
        console.log('in update', req.params.all())
        var id = req.param("id");
        var status = req.param("status");
        var title = req.param("title");
        console.log('in update', status, id)
        if (status && title && req.isSocket) {
            Hotelling.update(id, {status: status, title: title }).exec(function update(err, updated) {
                Hotelling.publishUpdate(updated[0].id, { status: updated[0].status, title: updated[0].title });

            })
        } else {
            if (status && req.isSocket) {
                Hotelling.update(id, {status: status }).exec(function update(err, updated) {
                    Hotelling.publishUpdate(updated[0].id, { status: updated[0].status });

                })
            }
        }
    },

    destroy: function (req, res) {

        // we must release the inventory
        var id = req.param('id');
        if (!id) {
            return res.badRequest('No id provided.');
        }

        // Otherwise, find and destroy the model in question
        Hotelling.findOne(id).exec(function(err, model) {
            if (err) {
                return res.serverError(err);
            }
            if (!model) {
                return res.notFound();
            }

            Hotelling.destroy(id, function(err) {
                if (err) {
                    return res.serverError(err);
                }
                console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model instances in \'hotellings destroy \'.',model.id);
                Hotelling.publishDestroy(model.id);

                Inventory.native(function(err, inventory) {
                    //inventory.update( { cdate:'05/19/2014', location: 'nyc',"details.no":509} , {
                    console.log(  'inventory.update cdate: ',model.cdate,"details.no",model.floor)
                    inventory.update( { cdate:model.cdate, location: 'nyc',"details.no":model.floor} , {
                        $set: {
                            'details.$.avail':0
                        }
                    }, {multi: false} , function(err, doc) {});
                });
                //must send id Hotelling.publishDestroy(model);// semd entire model back for post processing
                return res.json(model);
            });
        });
    }

};
//MyMMyModel.native(function(err, collection) {
//    collection.update({}, {
//        $unset: {
//            'contacts': 1
//        }
//    }, {multi: true} , function(err, doc) {});
//});