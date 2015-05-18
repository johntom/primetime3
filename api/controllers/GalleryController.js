util = require('util')
    , _ = require('lodash')
    , Q = require('q')
    , path = require('path')
    , walk = require('walk')
    , sizeOf = require('image-size')
    , fs = require('fs.extra');
//  , uuid = require('node-uuid');
/* IN FILE UPLOAD SAVE WITH A SAFE FILENAME */

module.exports = {
    imageview: function (req, res) {
        //console.log('gallery imageview ./api/docs... ', req.param('file'));
        filetype = req.param('file').substr(0, 3);
        dir = req.param('dir');
        if (dir !== undefined) {
            filepath = './api/docs/' + dir + '/';
        } else {
            filepath = './api/docs/';
        }
        fs.readFile(filepath + req.param("file"), "binary", function (error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            }
            else {
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                res.write(file, "binary");
                res.end();

            }
        });

    },
    // 'get /images/:dir/:file' :
    // {
    //    controller:'GalleryController',
    //    action: 'kendoview
    // function fileHandler(root, fileStat, next) {
    // fs.readFile(path.resolve(root, fileStat.name), function (buffer) {
    //    console.log(fileStat.name, buffer.byteLength);
    //    next();
    // });
    // }
    //      {
    //          name: "hand-ipad.png",
    //              type: "f",
    //          size: 69037
    //      },
    // http://localhost:8013/images/crew/1___Selected.jpg will disply
    getGalleryKendo: function (req, res) {
        //console.log('getGalleryKendo')
        var files = [];
        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        //var dd = '../MeansBasePT3/api/' + gallery;
        var dd = '../PrimeTime3/api/docs/' + gallery;
        var walker = walk.walk(dd, {followLinks: false});

        // walker.on('file', function (root, stat, next) {
        walker.on("file", function (root, fileStats, next) {
            fs.readFile(path.join(root, fileStats.name), function () {
                //console.log('fileStats.name done', fileStats.name, fileStats);
                files.push({
                    // name: 'images/' + gallery + '/' + fileStats.name,
                    // does not display      name:'http://localhost:8013/images/' + gallery + '/' + fileStats.name,
                    name: fileStats.name,
                    "type": "f",
                    "size": fileStats.size
                });
                next();
            });
        });
        walker.on('end', function () {
            //console.log('all done ', files);
            res.send(files);
            //res.send();
        });
    },

// the client resolved
// <img alt="1___Selected.jpg" src="api/gallerythumbsKendo/Crew?path=1___Selected.jpg" style="display: none;">   getThumbsKendo2: function (req, res) {

//Imagemajick
//    mkdir thumbs
//    mogrify  -format gif -path thumbs -thumbnail 100x100 *.jpg
//mogrify  -format gif -path thumbs -thumbnail 100x100 *.png
    // convert -define jpeg:size=500x180  hatching_orig.jpg  -auto-orient \
//  -thumbnail 250x90   -unsharp 0x.5  thumbnail.gif
// 3-1-2015
//  mogrify -resize 80x80 -background white -gravity center -extent 80x80 -format jpg -quality 75 -path thumbs *.jpg
// md thumbs
//mogrify -resize 100x100 -background white -gravity center -extent 80x80 -format jpg -quality 75 -path thumbs *.jpg
//    or
//mogrify -resize 100x100 -background white -gravity center -extent 80x80 -format jpg -quality 75 -path ..\crewthumbs *.jpg

//cd to c:\node\apps\sails10\PrimeTime3\api\docs\Crew>
// WE NEED GIF
//mogrify -resize 100x100 -background white -gravity center  -format gif -path ..\crewthumbs *.jpg

    //   mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\crewthumbs *.jpg
 //   $scope.datasets = ["archival","blackfish","bluefish","boats","codfish","crew","fluke", "porgy","seabass","stripedbass","weakfish"];
//cd to docs/folder
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\archival thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\blackfish thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\bluefish thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\boats thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\crew thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\fluke thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\porgy thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\seabass thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\stripedbass thumbs *.jpg
//mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\weakfish thumbs *.jpg

//mogrify -resize 550000@ -background white -gravity center  -format jpg -path ..\blackfishnew  *.jpg


    getThumbsKendo: function (req, res) {
        var files = [];
        var gallery = req.param('id');
        var image = req.param('path');// path is the name of the imagee file
        // strip extion and make it gif

        //   image = image.replace(".jpg", ".gif");
        //   image = image.replace(".png", ".gif");
        filepath = './api/docs/' + gallery + 'thumbs/' + image;


        console.log('getThumbsKendo filepath:',filepath);//, gallery, path)
        // if (image!==undefined)  getImage(imagepath)
        if (image !== undefined) {
            //    // serve up the thumb or get all files for listing
            fs.readFile(filepath, "binary", function (error, file) {
                if (error) {
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    res.write(error + "\n");
                    res.end();
                }
                else {
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    res.write(file, "binary");
                    res.end();
                }
            });
        } else {
            var dd = '../PrimeTime3/api/docs/' + gallery+'Thumbs';
            var walker = walk.walk(dd, {followLinks: false});
            // walker.on('file', function (root, stat, next) {
            walker.on("file", function (root, fileStats, next) {
                fs.readFile(path.join(root, fileStats.name), function () {
                    console.log('fileStats.name done', fileStats.name, fileStats);
                    files.push({
                        name: fileStats.name,
                        src:fileStats.name,
                        //?path='+
                        // name: 'images/' + gallery + 'Thumbs/' + fileStats.name,

                        // does not display      name:'http://localhost:8013/images/' + gallery + '/' + fileStats.name,
                        //name: fileStats.name,
                        "type": "f",
                        "size": fileStats.size
                    });
                    next();
                });
            });
            walker.on('end', function () {
                console.log('getThumbsKendo all done ', files);
                res.send(files);
                //res.send();
            });
        }
    },




    getGalleryArticlesKendo: function (req, res) {
        //var files = [];
        //var gallery = req.param('id');
        //var image = req.param('path');// path is the name of the imagee file
        //filepath = './api/docs/' + gallery + 'articles/' + image;
        //console.log('getArticlesKendo filepath:',filepath);//, gallery, path)

        //console.log('getGalleryKendo')
        var files = [];
        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        //var dd = '../MeansBasePT3/api/' + gallery;
        var dd = '../PrimeTime3/api/docs/' + gallery + 'Articles';
        var walker = walk.walk(dd, {followLinks: false});
        walker.on("file", function (root, fileStats, next) {
            fs.readFile(path.join(root, fileStats.name), function () {
                files.push({
                    // name: 'images/' + gallery + '/' + fileStats.name,
                    // does not display      name:'http://localhost:8013/images/' + gallery + '/' + fileStats.name,
                    name: fileStats.name,
                    "type": "f",
                    "size": fileStats.size
                });
                next();
            });
        });
        walker.on('end', function () {
            //console.log('all done ', files);
            res.send(files);
            //res.send();
        });
    }
,

getImage: function (imagepath) {
        console.log('getImage getImage', imagepath);
        //filetype = req.param('file').substr(0, 3);
        //dir = req.param('dir');
        //if (dir!==undefined) {
        //    filepath = './api/docs/'+dir+'/';
        //} else
        //{
        //    filepath = './api/docs/';
        //}
        fs.readFile(imagepath, "binary", function (error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            }
            else {
                res.writeHead(200, {"Content-Type": "image/jpeg"});
                res.write(file, "binary");
                res.end();

            }
        });

    },
    // /images/Crew/8101363005_1fefd75305_b.jpg


    getGalleryNewBand: function (req, res) {
        console.log('getGallery ')
        var files = [];
        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        var dd = '../PrimeTime3/api/docs/' + gallery;
        var walker = walk.walk(dd, {followLinks: false});
        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            //            files.push({url:'imagescrew/' + stat.name, "title" : "Presenting big pictures", "description":"Showing fullscreen images to present all your best!"});
            files.push({
                url: 'images/' + gallery + '/' + stat.name,
                "title": "Presenting big pictures",
                "description": "Showing fullscreen images to present all your best!"
            });
            next();
        });

        walker.on('end', function () {
            console.log(files);
            res.send(files);
        });
    },
    // $scope.photos = [
    // {src: 'http://farm9.staticflickr.com/8042/7918423710_e6dd168d7c_b.jpg', desc: 'Image 01'},
//    function getImage(res,file) {
//
//    console.log('===========================================');
//    return  res.write(file, "binary");
//
//}

    getGalleryNew: function (req, res) {
        console.log('getGallery ')
        var files = [];
        var isrc = '';
        var resize = {};

        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        var dd = '../PrimeTime3/api/docs/' + gallery;
        var walker = walk.walk(dd, {followLinks: false});
        var maxWidth = 770;
        var maxHeight = 470;
        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            //            files.push({url:'imagescrew/' + stat.name, "title" : "Presenting big pictures", "description":"Showing fullscreen images to present all your best!"});
            //isrc='images/' + gallery + '/' + stat.name;
            isrc = 'C:/Node/Apps/sails10/PrimeTime3/api/docs/' + gallery + '/' + stat.name;

            sizeOf(isrc, function (err, dimensions) {
                // console.log(dimensions.width, dimensions.height);
                if (dimensions !== undefined) {
                    owidth = dimensions.width;
                    oheight = dimensions.height;
                    resize = calculateAspectRatioFit(dimensions.width, dimensions.height, maxWidth, maxHeight);
                    // var TF =  canClose(modContract);
                    files.push({
                        src: 'images/' + gallery + '/' + stat.name,
                        "desc": gallery + '/' + stat.name,
                        "width": resize.width,
                        "height": resize.height,
                        "owidth": owidth,

                        "oheight": oheight

                    });
                }
            });

            next();
        });

        walker.on('end', function () {
            console.log(files);
            res.send(files);
        });
    },
    getFader: function (req, res) {

        var files = [];
        var isrc = '';
        var resize = {};

        var gallery = req.param('id');
        var dd = '../PrimeTime3/api/docs/' + gallery;
        console.log('getFader ',gallery,dd)
        // console.log('gallery ', dd)
        var walker = walk.walk(dd, {followLinks: false});
        var maxWidth = 770;
        var maxHeight = 470;
        walker.on('file', function (root, stat, next) {
            //isrc = 'C:/Node/Apps/sails10/PrimeTime3/api/docs/' + gallery + '/' + stat.name;
            console.log('stat ', stat.name)
            if (stat.name != '.DS_Store') {

//$scope.images = [{
                //    src: 'images/banner1.jpg',
                //    alt: 'Add your image description here'
                //}, {
                files.push({src: 'images/' + gallery + '/' + stat.name, alt: stat.name}); // insert as last item

            }
            next();
        });
        walker.on('end', function () {

            //  var strLen = files.length;
            // files = files.slice(0,strLen-1);
            console.log('gallery ', gallery, files.length);
            res.send(files);
        });
    },
    getGalleryNewWallop: function (req, res) {
        console.log('getGallery ')
        var files = [];
        var isrc = '';
        var resize = {};

        var gallery = req.param('id');
        //var dd = '../MeansBasePT3/api/docs/crew';//works
        var dd = '../PrimeTime3/api/docs/' + gallery;
        console.log('gallery ', dd)
        var walker = walk.walk(dd, {followLinks: false});
        var maxWidth = 770;
        var maxHeight = 470;
        walker.on('file', function (root, stat, next) {
            isrc = 'C:/Node/Apps/sails10/PrimeTime3/api/docs/' + gallery + '/' + stat.name;
            console.log('isrc ', isrc)
            if (stat.name != '.DS_Store') {
//                sizeOf(isrc, function (err, dimensions) {
//                     console.log(dimensions.width, dimensions.height);
////                    if (dimensions !== undefined) {
////                        owidth = dimensions.width;
////                        oheight = dimensions.height;
////                        resize = calculateAspectRatioFit(dimensions.width, dimensions.height, maxWidth, maxHeight);
////// var TF =  canClose(modContract);   ['images/banner2.jpg','images/banner1.jpg', 'images/banner3.jpg']
////                        // files.push({a: 'images/' + gallery + '/' + stat.name   });
////                        files.push('images/' + gallery + '/' + stat.name); // insert as last item
////
////                    }
//                    files.push('images/' + gallery + '/' + stat.name); // insert as last item
//
//
//                });

                files.push('images/' + gallery + '/' + stat.name); // insert as last item

            }
            next();
        });

        walker.on('end', function () {

            //  var strLen = files.length;
            // files = files.slice(0,strLen-1);
            console.log('gallery ', gallery, files.length);
            res.send(files);
        });
    },
    _config: {}
};

//* Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
//* images to fit into a certain area.
//*
//* @param {Number} srcWidth Source area width
//* @param {Number} srcHeight Source area height
//* @param {Number} maxWidth Fittable area maximum available width
//* @param {Number} maxHeight Fittable area maximum available height
//* @return {Object} { width, heigth }
//*/
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    // console.log(' width: '+srcWidth*ratio+'  height: '+srcHeight*ratio );
    var a = Math.round(srcWidth * ratio);
    var b = Math.round(srcHeight * ratio);
    return {width: a, height: b};
}
function getImage(res, file) {

    console.log('===========================================');
    return res.write(file, "binary");

}
