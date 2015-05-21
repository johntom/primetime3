/**
 * TasksController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
var lodash = require('lodash'),
    moment = require('moment'),
    accounting = require('accounting'),
    PDFDocument = require('pdfkit');
function getNextAvail(name) {
    // this gets all billing records with the same contract
    var gtot = 0;
    var nseq = 0;

    function getAll() {
        var deferred = Q.defer();
        Counters.find({id: name})
            .exec(function (error, counter) {
                if (error) {
                    deferred.reject(err);
                    //console.log(' Billing err', error);
                } else {
                    // console.log('=============billings', billings)
                    deferred.resolve(counter);
                }
            });

        return deferred.promise;

    };
    return getAll();
}


module.exports = {

    createPDF: function (req, poid) {

        var form = req.body;
        var book = form[0].book;
        var trip = form[0].trip;
        var id = trip.id;
        //var upform = {}; name phone email qty total deposit balance

        //<h4>Manifest</h4>
        var s1 = 'Date: ' + moment(trip.Start).format('dddd MMMM Do YYYY');
        var s2 = 'Time: ' + moment(trip.Start).format('H:mm A');

        //


        //console.log('-----success--------createPDF-----params------------', book, trip);
        //var par = req.param;
        //var potext, pohead , part, _i, _len;
        //var doc;
        doc = new PDFDocument;
        doc.info['Title'] = trip.tripdesc;
        doc.info['Author'] = 'John Tomaselli';
        doc.registerFont('Palatino', './api/fonts/PalatinoBold.ttf');
        doc.registerFont('cambria', './api/fonts/Cambria.ttc');
        var startcol = 45;
//'Prime Time 3/Jenglo '
        doc.font('Palatino').fontSize(22).fillColor("grey").text(trip.Owner, startcol, 65).font('Palatino').fontSize(11).text('party fishing from Orient Point', startcol + 260, 74);//95 104
        potext = '';
        doc.font('Palatino').fontSize(10).text(potext, startcol, 200, {

            width: 410,
            align: 'left'
        });
        //
        //<h4> Boat: {{trip.Owner}} Desc: {{trip.tripdesc}}</h4>
        //<h4> Price: {{trip.tripprice}} &nbsp; Spots: {{trip.spots}} &nbsp; Taken: {{trip.taken}} &nbsp;Avail: {{trip.spots - trip.taken}}</h4>
        //<hr>

        linePos = 110;//150;
        startcol2 = startcol + 55;
        startcol3 = 450;
        doc.text('Boat ', startcol, linePos).text(trip.Owner, startcol2, linePos);
        linePos += 15;
        doc.text('Date/Time', startcol, linePos).text(s1 + ' ' + s2, startcol2, linePos);
        linePos += 15;

        doc.text('Price', startcol, linePos).text(trip.tripprice, startcol2, linePos);//req.body.vendor.CompanyName
        linePos += 15;
        doc.text('spots', startcol, linePos).text(trip.spots, startcol2, linePos).text('taken', startcol2 + 50, linePos).text(trip.taken, startcol2 + 100, linePos).text(' avail ' + (trip.spots - trip.taken), startcol2 + 150, linePos);

        if (trip.chartername) {
            linePos += 15;
            doc.text('Charter', startcol, linePos).fillColor("blue").text(trip.chartername, startcol2, linePos);

        }

        //linePos += 15;
        //doc.text('taken', startcol, linePos).text(trip.taken + ' avail ' + (trip.spots - trip.taken), startcol2, linePos);
        //linePos += 15;

        linePos = 200;
        //startcol2 = startcol + 55;
        //startcol3 = 400;
        //doc.text("Captain's Manifest", startcol3, linePos);
        doc.font('Palatino').fontSize(22).fillColor("grey").text("Captain's Manifest", startcol, linePos).font('Palatino');

        //
        ////(col,row)
        //var VDATE = moment(req.body.VendorInvDate).format("MM/DD/YYYY");
        //var PODATE = moment(req.body.Date).format("MM/DD/YYYY");
        //
        //linePos = 220;//250;
        //startcol2 = startcol + 155
        //doc.text('Date', startcol, linePos).text('Company', 100, linePos).text('Vendor Inv No', 260, linePos).text('Vendor Inv Date', 420, linePos)
        //    .fillColor("blue").text('Status', 500, linePos);
        //
        //linePos += 20;
        //doc.fillColor("black").text(PODATE, startcol, linePos).text(vend.CompanyName, 100, linePos, {width: 160, align: 'left' })
        //    .text(req.body.VendorInvNum, 260, linePos).text(VDATE, 420, linePos)
        //    .fillColor("blue").text(req.body.Status, 500, linePos);
        //
        //linePos += 25;
        //startcol = 45;
        //doc.fillColor("black").text('Comments', startcol, linePos).text(req.body.Comments, 105, linePos, {width: 410, align: 'left' });

        var details = book;//.details;//[1]
        var linePos = 250;

        //       .text('email', 90, linePos)

        doc.font('Palatino').fontSize(10).text('qty', 45, linePos)
            .text('name', 70, linePos)
            .text('phone', 190, linePos)
            .text('total', 445, linePos)
            .text('deposit', 485, linePos, {width: 40, align: 'right'})
            .text('balance', 540, linePos, {width: 40, align: 'right'});

        linePos += 20;
        //var upform = {}; name phone email qty total deposit deposit

        // dont use balance use po.total-po.deposit
        details.forEach(function (po) {
            var liDesc;

            doc.font('Palatino').fontSize(10).text(po.qty, 45, linePos)
                .text(po.name, 70, linePos, {width: 120, align: 'left'})
                .text(po.phone, 190, linePos, {width: 240, align: 'left'})
                .text(accounting.formatMoney(po.total), 430, linePos, {width: 50, align: 'right'})
                .text(accounting.formatMoney(po.deposit), 480, linePos, {width: 50, align: 'right'})

                .text(accounting.formatMoney(po.total - po.deposit), 530, linePos, {width: 50, align: 'right'});
            linePos = doc.y + 20;
        });
        linePos = doc.y + 100;// 100


        //doc.rect(430, linePos - 20, 170, 125)
        //    .stroke();
        //
        //
        //var totCol = 440;
        //var tolCol2 = 500;
        //doc.font('Palatino').fontSize(10).text(potext, startcol, 200, {width: 410, align: 'right'});
        //doc.text('Subtotal', totCol, linePos).text(accounting.formatMoney(req.body.SubTotal), tolCol2, linePos, {
        //    width: 80,
        //    align: 'right'
        //});
        //linePos += 20;
        //doc.text('Tax%', totCol, linePos).text(req.body.TaxPcnt, tolCol2, linePos, {width: 80, align: 'right'});
        //linePos += 20;
        //doc.text('TaxAmt', totCol, linePos).text(accounting.formatMoney(req.body.TaxAmount), tolCol2, linePos, {
        //    width: 80,
        //    align: 'right'
        //});
        //linePos += 20;
        //doc.text('Freight', totCol, linePos).text(accounting.formatMoney(req.body.Freight), tolCol2, linePos, {
        //    width: 80,
        //    align: 'right'
        //});
        linePos += 20;
        doc.font('Palatino', 12).fillColor("blue").text(s1, startcol, linePos);
        //linePos += 40;
        //startcol2 = 300;
        //startcol3 = 350;
        //doc.text(s1, startcol, linePos);
        //linePos += 20;
        doc.write('./api/docs/_manifest/trip' + id + '.pdf');
        console.log('===after po.pdf write==================================');

        //
        //doc.image('./api/uploads/dk.jpg', startcol - 23, linePos - 60)
        ////line cap settings
        //doc.lineWidth(2);
        //doc.lineCap('butt')
        //    .moveTo(startcol, linePos)
        //    .lineTo(startcol + 155, linePos)
        //    .stroke()
        //    //  doc.lineWidth(2);
        //    //  doc.lineCap('butt')
        //    .moveTo(startcol2, linePos)
        //    .lineTo(startcol2 + 75, linePos)
        //    .stroke();
        //
        ////  doc.text('---------------------------------------', startcol, linePos).text('--------------', startcol2, linePos);
        //linePos += 5;
        //doc.font('Palatino', 12).fillColor("blue").text(' Authorized Signature ', startcol, linePos).text('Date', startcol2, linePos);
        //doc.write('./api/uploads/po/po' + poid + '.pdf');
        //console.log('===after po.pdf write==================================');

        // // end of promise
        //})
        //.catch(function (err) {
        //    console.error('er ', err)
        //    return next(err);
        //});


    },
    //db.tasks.find({Start:{ $gte : new ISODate("2015-05-06T20:15:31Z")} }).sort({Start: 1})
    getList: function (req, res) {
        console.log('getListOrig=======THIS IS USED FROM ROUTES===========')
        var params = req.params.all();
        var start;

        // gt and dates from yesterday
        if (req.user !== undefined) {
            // cjeck for role = 4
            start = new Date('1/1/2015');
            start = moment().format('mm/dd/yyyy');

        } else {
            start = new Date();
            start.setHours(0, 0, 0, 0);
        }
        //var end = new Date();
        //end.setHours(23,59,59,999);
        //
        //  Tasks.find().sort({Start: 1})

//        var ddate_str1 = new Date('01/04/2014');
//        var ddate_str2 = new Date('02/04/2014');
////console.log('findAllWrapped get ddate_str1/2', ddate_str1, ddate_str2)
//// Po.find( {'POID':{$gt: gtnum } })
////   Po.find( { "Date": {$gte: date_str1,$lte: date_str2} } )
////Po.find( {'POID': gtnum  })
////db.po.find({ "Date": {$gte: ddate_str1, $lte: ddate_str2} }) .sort('POID -1')
////   db.po.find( { POID:{$gt:26531} } ).forEach( function(po) {
//        db.po.find( { Date:{$gte: ddate_str1, $lte: ddate_str2} } ).forEach( function(po) {


        Tasks.find({Start: {$gte: start}}).sort({Start: 1})
//        Tasks.find().sort({Start: 1})

            .exec(function (error, tasks) {
                if (error) {
                } else {
                    //console.log('posts====================================',tasks)
                    // res.send({data:tasks});// object
                    tasks.forEach(function (mess) {
                        mess.cdate = moment(mess.Start).format("MM/DD/YYYY");
                        mess.cday = moment(mess.Start).format("dddd");
                        mess.comboday = mess.cdate + ' ' + mess.cday;

                        mess.ctime = moment(mess.Start).format("H:mm A");
                        mess.diff = moment(mess.Start).fromNow(true); // 4 years
                        mess.mth = moment(mess.Start).format("MMMM"); // 4 years
                        if (mess.taken === undefined) mess.taken = 0;
                        if (mess.OwnerID === 1) mess.Owner = 'Prime Time 3';
                        if (mess.OwnerID === 2) mess.Owner = 'Jenglo';
                        if (mess.details === undefined) mess.details = [];
                        if (mess.spots === undefined) {
                            switch (mess.TripType) {

                                case  1:
                                    mess.spots = 20;
                                    mess.tripdesc = 'Seasonal Bottom';
                                    mess.tripprice = 100;
                                    break
                                case  2:
                                    mess.spots = 16;
                                    mess.tripdesc = 'Rodbender';
                                    mess.tripprice = 125;
                                    break
                                case  3:
                                    mess.spots = 12;
                                    mess.tripdesc = 'PT Bass/Blues ';
                                    mess.tripprice = 125;
                                    break
                                case  4:
                                    mess.spots = 10;
                                    mess.tripdesc = 'JG Bass/Blues';
                                    mess.tripprice = 125;
                                    break
                                case  5:
                                    mess.spots = 16;
                                    mess.tripdesc = 'Block Island';
                                    mess.tripprice = 150;
                                    break
                                case  6:
                                    mess.spots = 20;
                                    mess.tripdesc = 'Sundown Bottom';
                                    mess.tripprice = 75;
                                    break
                                case  7:
                                    mess.spots = 10;
                                    mess.tripdesc = 'Limited Special';
                                    mess.tripprice = 150;
                                    break
                                case  8:
                                    mess.spots = 10;
                                    mess.tripdesc = 'Private Charter';
                                    mess.tripprice = 150;
                                    break
                                //default:
                                //    result[key] = num;
                            }
                        }
                    });

                    //console.log('User with socket id ' + req.socket.id + ' is now subscribed to all of the model instances in \'messages\'.', models);

                    //console.log(tasks[0])
                    //     res.json(tasks);
                    res.send(tasks);// array
                }
            });
    },
    create: function (req, res) {
        console.log('in create', req.params.all())
        var OwnerID = req.param('OwnerID');
        //if (OwnerID === 'Primetime3') {
        //    OwnerID = 1;
        //} else {
        //    OwnerID = 1;
        //}
        var model = {
            "Start": req.param('Start'),
            "End": req.param('End'),
            "OwnerID": OwnerID.id,
            //  "TaskID" : 1,
            "Title": req.param('Title'),
            "StartTimezone": "",
            "EndTimezone": "",
            "RecurrenceRule": null,
            "RecurrenceID": null,
            "RecurrenceException": null,
            "IsAllDay": false,
            "TripType": 1,
            "spots": req.param('spots'),
            "tripdesc": req.param('tripdesc'),
            "tripprice": req.param('tripprice'),

            "chartername": req.param('chartername'),
            "isCharter": req.param('isCharter')

        };

        // TODO: upon message creation, how to populate the user here, so the associated user gets sent back as a property of the message
        Tasks.create(model)
            .exec(function (err, rec) {
                if (err) {
                    return console.log(err);
                }
                else {
                    //console.log('in todo create')
                    //console.log('User with socket id '+req.socket.id+' is now subscribed to all of the model create in \'todos\'.');
                    //Todo.publishCreate(model);
                    res.json(rec);
                }
            });
    },


    createorKendo: function (req, res) {
        console.log('in create', req.params.all())
        var id = req.param("TaskID");
        console.log('===PostsController::update==============================', id)

        if (id !== 0) {

            var form = req.body;
            console.log('===PostsController::update==============================', id, form)

            Tasks.update({"TaskID": id}, form)
                .exec(function (err, updated) {
                    if (err) {
                        return {data: 'error ' + err}//  console.log(err);
                    }
                    else {
                        console.log('=======updated[0]', updated[0])

                        //if (updated[0].id !== undefined) {
                        //    Billing.publishUpdate(updated[0].id, updated[0]);
                        //}
                        res.json({data: updated[0]});//'fini'});//model);
                    }
                });
        } else {
            var model = {
                TaskID: 0,
                Title: req.param('Title'),
                Start: req.param('Start'),
                End: req.param('End'),
                StartTimezone: req.param('StartTimezone'),
                EndTimezone: req.param('EndTimezone'),
                Description: req.param('Description'),
                RecurrenceID: req.param('RecurrenceID'),
                RecurrenceRule: req.param('RecurrenceRule'),
                RecurrenceException: req.param('RecurrenceException'),
                OwnerID: req.param('OwnerID'),
                IsAllDay: req.param('IsAllDay'),
                maxAvail: {from: "maxAvail"},
                taken: {from: "taken"}

            };

            getNextAvail("TaskID").then(function (results) {
                var ss = parseInt(results[0].seq);
                ss++;
                console.log('===update=======================results============', id, ss, results[0]);

                Counters.update(results[0].id, {seq: ss}).exec(function update(err, cm) {
                    if (err) {

                    }
                    else {
                        // return nseq;

                    }
                })
                model.TaskID = ss;
                Tasks.create(model).exec(function update(err, tasks) {
                    console.log('in create', tasks);//status
                    res.json(tasks);
                })


            })// checkContract promise and closure
        }
    },

    update: function (req, res) {
        var id = req.param("TaskID");

        var params = req.params.all();
        //    model = _.omit(model, '$$hashKey');

        console.log('============================================\n', params);
        ////  console.log('============================================\n', req.body);
        //var form = req.body;
        //console.log('===TasksController::update==============================', id, form)
        //var book = form.book;
        //var trip = form.trip;
        //var id = form.trip.id;
        // delete detail where qty = 0;
        if (id !== 0) {
            Tasks.update({"TaskID": id}, params)
                .exec(function (err, updated) {
                    if (err) {
                        return {data: 'error ' + err}//  console.log(err);
                    }
                    else {
                        console.log('=======updated[0]', updated[0])

                        //if (updated[0].id !== undefined) {
                        //    Billing.publishUpdate(updated[0].id, updated[0]);
                        //}
                        res.json({data: updated[0]});//'fini'});//model);
                    }
                });
        }
    },
    updateTrip: function (req, res) {
        // var id = req.param("TaskID");

        //var params = req.params.all();
        //var id = params.id;// mongo id
        ////    model = _.omit(model, '$$hashKey');

        // console.log('============================================\n', params);
        ////  console.log('============================================\n', req.body);
        //var form = req.body;
        //console.log('===TasksController::update==============================', id, form)
        var form = req.body;
        var book = form[0].book;
        var trip = form[0].trip;
        var id = trip.id;
        var upform = {};
        if (trip.taken === undefined) trip.taken = 0;
        upform.taken = trip.taken;
        upform.chartername = trip.chartername;
        upform.spots = trip.spots;
        upform.tripprice = trip.tripprice;
        upform.isCharter = trip.isCharter;
        upform.details = trip.details;

        // added
        upform.Start = trip.Start;
        upform.End = trip.End;
        upform.OwnerID = trip.OwnerID;
        upform.Title = trip.Title;
        upform.tripdesc = trip.tripdesc;
//if ( upform.OwnerID===1){
//    upform.Owner = 'Prime Time 3';
//}
//        else{
//    upform.Owner ='Jenglo';
//}


        console.log('===================trip.details=========================\n', trip.details);
        // delete detail where qty = 0;
        if (id !== 0) {
            Tasks.update(id, upform)
                .exec(function (err, updated) {
                    if (err) {
                        return {data: 'error ' + err}//  console.log(err);
                    }
                    else {
                        //   console.log('=======updated[0]', updated[0])

                        //if (updated[0].id !== undefined) {
                        //    Billing.publishUpdate(updated[0].id, updated[0]);
                        //}TasksController

                        module.exports.createPDF(req, form);
                        res.json({data: updated[0]});//'fini'});//model);
                    }
                });
        }
    },

    updateBookingNew: function (req, res) {
        // / this is used when we create a new booking  this is really adding a detail booking
        var params = req.params.all();
        //    model = _.omit(model, '$$hashKey');
        console.log('============================================\n', params);
        //  console.log('============================================\n', req.body);
        var form = req.body;
        var book = form[0].book;// this is a new booking and should be added to "details" of the trip
        var trip = form[0].trip;
        var id = trip.id;// mongo id
        console.log('===TasksController::update==============================', id, form)
        var upform = {};
        upform.spots = trip.spots;
        upform.tripdesc = trip.tripdesc;
        upform.tripprice = trip.tripprice;
        if (trip.taken === undefined) trip.taken = 0;
        upform.taken = trip.taken + book.qty;

        upform.details = trip.details;
        upform.details.push(book);

        if (id !== 0) {
            //Tasks.update({"TaskID": id}, form)
            Tasks.update(id, upform)
                .exec(function (err, updated) {
                    if (err) {
                        return {data: 'error ' + err}//  console.log(err);
                    }
                    else {
                        // console.log('=======updated[0]', updated[0])
                        //if (updated[0].id !== undefined) {
                        //    Billing.publishUpdate(updated[0].id, updated[0]);
                        //}
                        res.json({data: updated[0]});//'fini'});//model);
                    }
                });
        }
    },
    destroy: function (req, res) {
        //  var taskid = parseInt(req.param('id'));
     //   var vid = parseInt(req.param('id'));
        var vid = req.param('id');
        console.log('in destroy', vid,req.params.all());
        //
        //if (!taskid) {
        //    return res.badRequest('No taskid provided.');
        //}
        //
        //console.log('=destroy=======', taskid)
        // Otherwise, find and destroy the model in question
        //  Tasks.findOne({"TaskID": taskid}).exec(function (err, model) {
        //   Tasks.findOne( id ).exec(function (err, model) {
        //console.log('model ', model)
        //// Tasks.find({"TaskID": id}).exec(function (err, model) {
        //if (err) {
        //    return res.serverError(err);
        //}
        //if (!model) {
        //    return res.notFound();
        //}
        //Audit.create(model)
        //    .exec(function (err, todo) {
        //        if (err) {
        //            return//  console.log(err);
        //        }
        //        else {
        //
        //        }
        //    });
        //var bcs = model.BCSNumber;
        //else {
        //    console.log('=model=======', model.id)

        console.log('=destroy=======', vid)
        Tasks.destroy(vid, function (err) {
            if (err) {
                console.log('=err=======', err)
                return res.serverError(err);
            }
            console.log('=success=======')
            return res.json('success');
        });

    }

};

