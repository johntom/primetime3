/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

util = require('util')
    , _ = require('lodash')
    , Q = require('q')
    , path = require('path')
    , moment = require('moment')
    , fs = require('fs.extra');

var mandrill_wrapper = require('../services/mandrill_wrapper.js');

var fromName = {};

var Mandrill = require('machinepack-mandrill');
//var Stripe = require('machinepack-stripe');


function sendEmail(mandrillOptions) {
    mandrillOptions.fromEmail = 'primetime3@optonline.net';
    var tags = ["sample-messages", "firstname", "lastname", "id"];
//primetime3@optonline.netprimetime3@optonline.net
    mandrillOptions.tags = tags;
    var to = mandrillOptions.users.map(function (user) {
        return {
            "email": user.email,
             name: user.firstname// + " " + user.lastname

        };
    });


    // this is the only way we got vars to work
    var vars = mandrillOptions.users.map(function (user) {
        return {
            "rcpt": user.email,
            "vars": [
                {
                    "name": "firstname",
                    "content": user.firstname
                },
                {
                    "name": "lastname",
                    "content": user.lastname
                }
                //,
                //{
                //    "name": "clientcode",
                //    "content": user.clientcode
                //}
                //
            ]
        };
    });


    //var replyToEmail = mandrillOptions.users.map(function (user) {
    //    return {
    //        name: user.CLIENTID
    //    }
    //});
    mandrillOptions.replyToEmail = 'primetime3@optonline.net  ';
    mandrillOptions.to = to;
    mandrillOptions.vars = vars;
    mandrill_wrapper.send(mandrillOptions);

};
function processReply(reply, processCallback) {
    async.parallel({
            user: function (callback) {
                User.findOne({email: reply.msg.from_email}, callback);
            },
            someObject: function (callback) {
                // here we parse the id out of the email ,  which was in the reply-to field when we
                // sent the original message
                var objectId = parseObjectId(reply.msg.email);
                SomeObject.findById(objectId, callback);
            }
        },
        function (err, results) {
            if (err) {
                handleErrors(err, processCallback);
            } else {
                Message.create({
                    content: removeQuotedText(reply.msg.text),   // we'll explain this function below
                    createdById: results.user._id,
                    timestamp: new Date(reply.ts * 1000),   // mandrill returns a UTC unix timestamp ,
                    // we just need to multiply it by 1000 to
                    // make it a regular date time
                    objectId: results.someObject._id
                }, processCallback);
            }
        });
};
function removeQuotedText(text) {
    var delimeter = 'notification@sampleapp.com';

    // escaping the dot in .com ,  so it doesn't affect our regex pattern below
    delimeter.replace('.', '\\.');

    // this matches from the beginning of the email ,  multiple lines ,  until the line
    // the has the delimeter ,  lines under the delimeter (including the delimeter line) won't match
    var pattern = '.*(?=^.*' + delimeter + '.*$)';

    // we are using XRegExp
    var regex = xregexp(pattern, 'ims');

    var delimeterFound = xregexp.test(text, regex);

    if (delimeterFound) {
        var match = xregexp.exec(text, regex);
        return trimNewLines(match[0]);
    } else {
        return trimNewLines(text);
    }
};
// email clients usually add extra white lines after the reply ,  this function removes empty
// new lines before and after the passed in text
function trimNewLines(text) {
    return text.replace(/^\s+|\s+$/g, '');
};
module.exports = {
    findTemplates: function (req, res) {
        Mandrill.listTemplates({
            apiKey: '5CTx34Ap1BS5cAKtP0xfwg'
        }).exec({
            // An unexpected error occurred.
            error: function (err) {
            },
            // OK.
            success: function (result) {
                return res.json(result);
            }
        })
    },
    emailmonth: function (req, res) {

        Contact.find()
            .exec(function (error, contact) {
                if (error) {

                    //  console.log(' filing err', error);
                } else {
                    ////  var user1 = {"email": 'jrt@gtz.com' ,  FNAME: 'John' ,  LNAME: 'Tomaselli'};
                    ////primetime3@optonline.netprimetime3@optonline.net jenboccio@optonline.net
                    ////var user1 = {"email": 'jrt@gtz.com', FNAME: 'John', LNAME: 'Tomaselli', ID: '12389'};
                    ////var user2 = {"email": 'jenboccio@optonline.net', FNAME: 'Jen ', LNAME: 'Boccio'};
                    //
                    ////var user1 = {"email": 'jrt@gtz.com', firstname: 'John', lastname: 'Tomaselli'};
                    ////var user2 = {"email": 'jenboccio@optonline.net', firstname: 'Jen ', lastname: 'Boccio'};
                    ////
                    ////var users = [user1,user2];
                    //var message = 'Prime Time 3 ~ Jenglo Fishing Trips';
                    //var mandrillOptions = {};
                    //mandrillOptions.fromName = 'PrimeTime3~Jenglo';
                    //mandrillOptions.users = users;
                    //mandrillOptions.subject = "First Fishing Trip";
                    //mandrillOptions.someObject = contact[0];
                    //mandrillOptions.message = 'monthly email';
                    //mandrillOptions.templatename = "CaptMike";//Examplejrt1 Template";
                    //// console.log(' mandrillOptions.someObject', mandrillOptions.someObject)
                    //
                    //sendEmail(mandrillOptions);
                    //res.send({data:'success'});



               /////////////////////////
                    //  var user1 = {"email": 'jrt@gtz.com' ,  FNAME: 'John' ,  LNAME: 'Tomaselli'};
                    //primetime3@optonline.netprimetime3@optonline.net jenboccio@optonline.net
                    //var user1 = {"email": 'jrt@gtz.com', FNAME: 'John', LNAME: 'Tomaselli', ID: '12389'};
                    //var user2 = {"email": 'jenboccio@optonline.net', FNAME: 'Jen ', LNAME: 'Boccio'};

                    //var user1 = {"email": 'jrt@gtz.com', firstname: 'John', lastname: 'Tomaselli'};
                    //var user2 = {"email": 'jenboccio@optonline.net', firstname: 'Jen ', lastname: 'Boccio'};
                    //
                    //var users = [user1]; //,user2
                    var users = contact;

                    var message = 'Prime Time 3 ~ Jenglo Fishing Trips';
                    var mandrillOptions = {};
                    mandrillOptions.fromName = 'PrimeTime3~Jenglo';
                    mandrillOptions.users = users;
                    mandrillOptions.subject = "First Fishing Trip";
                    mandrillOptions.someObject = contact[0];
                    mandrillOptions.message = 'monthly email';
                    mandrillOptions.templatename = "CaptMike";//Examplejrt1 Template";

                    sendEmail(mandrillOptions);
                    res.send({data:users});

                }
            });


    },

    create: function (req, res) {
        console.log('===ContactController::create==============================')

        var params = req.params.all();
         console.log('============================================\n', params);

        var form = req.body;

        Contact.create(form

        )
            .then(function (contact) {

           //    return res.json({ data: contact });
                return res.json({ data: 'success' });
            })
            .catch(function (err) {
                console.error('er ', err)
                return res.json({ data: 'failure' });

            })

    }
};

