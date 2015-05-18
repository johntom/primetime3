/**
 * FilingController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    index: function (req, res) {
        //  console.log('req index ===========', req.params.all())
        //  console.log('req index ===========', req.param("id"))

    },
    getTags: function(req, res) {
       // Posts.distinct('tags')
        Posts.native(function (err, collection) {
            collection.distinct('tags', function (mongoErr, docs) {

                if (mongoErr) {
                    console.error(mongoErr);
                    return res.send('geoProximity failed with error=' + mongoErr);
                } else {

                    //
                    //var returnCt =docs.results.length;
                    //var dentists = [];
                    ////dentists=docs.results;
                    //_.forEach(docs.results, function (result) {
                    //    dentists.push(_.extend(result.obj, {
                    //        dis: result.dis
                    //    }))
                    //});
                    //
                    //var returnArray = dentists.splice(startpos, pagesize);
                    //// push the last record with stats
                    //returnArray.push({ reccount: returnCt});
                    //console.log('returnCt=', returnCt);
                    //res.json({ data: returnArray });
                    //console.log('returnCt=', docs);
                    res.json({ data:  docs });

                }
            });
        })
    },
    update: function (req, res) {
        var id = req.param("id");
        console.log('===PostsController::update==============================',id)

        var params = req.params.all();
        //    model = _.omit(model, '$$hashKey');

        console.log('============================================\n', params);
        //  console.log('============================================\n', req.body);
        var form = req.body;
        if (id !== 0) {
            Posts.update(id, form)
                .exec(function (err, updated) {
                    if (err) {
                        return {data: 'error '+err}//  console.log(err);
                    }
                    else {
                        console.log('=======updated[0]',updated[0])

                    //if (updated[0].id !== undefined) {
                    //    Billing.publishUpdate(updated[0].id, updated[0]);
                    //}
                    res.json({data: updated[0]});//'fini'});//model);
                    }
                });
        }
    },
    create: function (req, res) {
        var params = req.params.all();
        var form = req.body;
        form = _.omit(form, 'id');
        //   Filing.create( params
        console.log('====PostsController======create==========================',form)

        Posts.create(form)
            .then(function (post) {

                return res.json({ data: post });
            })
            .catch(function (err) {
                console.error('er ', err)
            })
    },

    getList: function (req, res) {
         console.log('getList=======THIS IS USED FROM ROUTES===========')
        var params = req.params.all();
        Posts.find()
            .exec(function (error, posts) {
                if (error) {
                } else {
                    //console.log('posts====================================',posts)
                    res.send({data:posts});// object
                    //res.send(posts);// array
                }
            });
    },

    getOne: function (req, res) {
        var params = req.params.all();

        console.log('getOne==================================params==',params)
        //  console.log('====== "author" : "frontpage",======================================\n', params);
        Posts.find({"author" : "frontpage"})
            .exec(function (error, filings) {
                if (error) {
                    //  console.log(' filing err', error);
                } else {
                    res.send(filings);
                }
            });
    },

    // restangular
    getAllCustom: function (req, res) {
        console.log('getAllCustom====================================')
//  "author" : "frontpage",
        var params = req.params.all();
        Posts.find()
          .exec(function (error, filings) {
          if (error) {

                        //  console.log(' filing err', error);
                    }
                else {
              res.json({data: posts});
                    }
                });
        }



    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to FilingController)
     */
  //  _config: {}


};
