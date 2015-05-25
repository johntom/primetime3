util = require('util')
    , _ = require('lodash')
    , Q = require('q')
    , path = require('path')
    , walk = require('walk')
    , fsx = require('fs.extra')
    , fs = require('fs')
   // , gm = require('gm');  //GraphicsMagick
   , gm = require('gm').subClass({imageMagick: true});

//  , uuid = require('node-uuid');
/* IN FILE UPLOAD SAVE WITH A SAFE FILENAME */

module.exports = {

    pdfview: function (req, res) {
        // console.log('upload controlller ./api/docs... ', req.param('file'));
        //  console.log("Request handler show was called.", './api/docs/' + req.param('pdf'));
        // file type
        filetype = req.param('file').substr(0, 3);
        // console.log('filetype:: ', filetype)
        filepath = './api/docs/_manifest/';
        fs.readFile(filepath + req.param("file"), "binary", function (error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            }
            else {
                res.writeHead(200, {"Content-Type": "application/pdf"});
                res.write(file, "binary");
                res.end();
            }
        });

    },

    pdfviewAllTypes: function (req, res) {
        var fn = req.param('file');
        var extname = path.extname(fn);
        //  console.log('pdfview.. ', fn, extname);
        filepath = './api/docs/';
        fs.readFile(filepath + req.param("file"), "binary", function (error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            }
            else {

                switch (extname) {
                    case '.pdf':
                        res.writeHead(200, {"Content-Type": "application/pdf"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    case '.jpg':
                        res.writeHead(200, {"Content-Type": "image/jpeg"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    case '.png':
                        res.writeHead(200, {"Content-Type": "image/png"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    case '.tiff':
                        res.writeHead(200, {"Content-Type": "image/tif"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    case '.docx':
                        res.writeHead(200, {"Content-Type": "application/docx"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    case '.doc':
                        res.writeHead(200, {"Content-Type": "application/doc"});
                        res.write(file, "binary");
                        res.end();
                        break;
                    default:

                        res.writeHead(200, {"Content-Type": "application/pdf"});
                        res.write(file, "binary");
                        res.end();
                        break;
                }


            }
        });

    },


    // move next to gallery and delete crew
    imageview: function (req, res) {
        console.log('upload u imageview ./api/docs... ', req.param('file'));
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
    imageviewcrew: function (req, res) {
        console.log('upload imageviewcrew ./api/docs... ', req.param('file'));
        filetype = req.param('file').substr(0, 3);
        // filepath = './api/docs/';

        filepath = './api/docs/crew/';
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

//    this.Context.Response.Flush();
//this.Context.Response.Close();
//
    uploadGallery: function (req, res) {
        //var fn = req.file('file')._files[0].stream.filename;
        // sails.log.info("uploadGallery");
        //  console.log(req.params.all(), req.body)
        var gallery = req.param('gallery');
        var thepath = '../../api/docs/' + gallery[1];//+'/';// not sure why gallery is an array
        var fn = _saveAs(req.file('file')._files[0].stream);

        console.log('====uploadGallery=====================================', fn, thepath)
        //allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.ms-excel'
        //    , "application/xls", "application/xlsx", "text/plain",
        //    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        //    'application/xml', 'image/gif', 'image/x-icon', 'video/x-ms-wmv', 'video/mp4',
        //    'application/x-zip-compressed', 'application/vnd.ms-outlook', 'application/octet-stream',
        //    'application/mpeg','audio/mpeg',
        //    'video/quicktime' ,'video/x-sgi-movie','video/x-msvideo','video/x-msvideo','text/x-vcard']  ,
        //    //maxBytes: 100 * 1024 * 1024
        //    maxBytes: 30000000
        var upload = req.file('file')._files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount,
            validated = true,
            errorMessages = [],
            fileParams = {},
            settings = {
                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                maxBytes: 1000000 //100 * 1024 * 1024
            };

        // Check file type
        if (_.indexOf(settings.allowedTypes, headers['content-type']) === -1) {
            validated = false;
            errorMessages.push('Wrong filetype (' + headers['content-type'] + ').');
        }
        // Check file size
        if (byteCount > settings.maxBytes) {
            validated = false;
            errorMessages.push('Filesize exceeded: ' + byteCount + '/' + settings.maxBytes + '.');
        }
        // Upload the file.
        if (validated) {
            sails.log.info("validated");
            req.file('file')
                .upload({
                    // You can apply a file upload limit (in bytes)
                    dirname: '../../api/docs/' + gallery[1] + '/',
                    maxBytes: 30000000
                    , saveAs: fn

                },
                function (err, files) {

                    if (err) {
                        sails.log.info("upload  -> Err:", err, "File: ");//, file);

                        return res.serverError(err);
                    }
                    var origpath = 'C:/Sails10/PrimeTime3/api/docs/' + gallery[1] + '/' + fn;
                    var fntarget_path = 'C:/Sails10/PrimeTime3/api/docs/' + gallery[1] + 'Thumbs/' + fn;
                    var fntarget_path2 = 'C:/Sails10/PrimeTime3/api/docs/' + gallery[1] + 'Articles/' + fn;


                   // fsx.copy(origpath, fntarget_path)  //, err
                  //  fsx.copy(origpath, fntarget_path2)  //, err
                    gm(origpath)
                        .size(function (err, size) {
                            if (!err) {
                                console.log(size.width > size.height ? 'wider' : 'taller than you');
                                if (size.width > size.height) {
                                   if (size.width>1000) {
                                       gm(origpath)
                                           .resize('1000')
                                           .stream(function (err, stdout, stderr) {
                                               var writeStream = fs.createWriteStream(origpath);
                                               stdout.pipe(writeStream);
                                           });
                                   }
                                    gm(origpath)
                                        .resize('250')
                                        .stream(function (err, stdout, stderr) {
                                            var writeStream = fs.createWriteStream(fntarget_path2);
                                            stdout.pipe(writeStream);
                                        });
                                } else {
                                    if (size.height>600) {
                                        gm(origpath)
                                            .resize('x600')
                                            .stream(function (err, stdout, stderr) {
                                                var writeStream = fs.createWriteStream(origpath);
                                                stdout.pipe(writeStream);
                                            });
                                    }
                                    gm(origpath)
                                        .resize('x250')
                                        .stream(function (err, stdout, stderr) {
                                            var writeStream = fs.createWriteStream(fntarget_path2);
                                            stdout.pipe(writeStream);
                                        });
                                }
                            }

                        });
                    gm(origpath)
                        .resize('80', '80')
                        .stream(function (err, stdout, stderr) {
                            var writeStream = fs.createWriteStream(fntarget_path);
                            stdout.pipe(writeStream);
                        });
                    //gm(fntarget_path)
                    //    .resize(80, 80)
                    //    .autoOrient()
                    //    .write(writeStream, function (err) {
                    //        if (!err) console.log(' hooray! ');
                    //    });
                    //gm(origpath).size(function(err, value){
                    //    console.log(value)
                    //    // note : value may be undefined
                    //})

                    //var oldPath  = '../../api/docs/'+gallery[1]+'/'+fn;
                    //var newPath  = '../../api/docs/'+gallery[1]+'Thumbs/'+fn;
                    //var newPath2 = '../../api/docs/'+gallery[1]+'Articles/'+fn;


                    //fs.rename(oldPath, newPath, function (err){
                    //
                    //})
                    //fs.rename(oldPath, newPath2,function (err) {
                    //})}

                    //  fs.rename('/tmp/hello', '/tmp/world', function (err) {
                    //  fs.rename('oldPath', '/tmp/world', function (err) {
                    //      if (err) throw err;
                    //      fs.stat('/tmp/world', function (err, stats) {
                    //          if (err) throw err;
                    //          console.log('stats: ' + JSON.stringify(stats));
                    //      });
                    //  });


                    //fs.copy(oldPath, newPath, function (err) {
                    //    if (err) return console.error(err)
                    //    console.log("fs.copy success!")
                    //}); // copies file


                    return res.json(200, {
                            // required for redactor
                            //    filelink: 'images/crew/'+fn
//                     sails.log.info("upload UPLOADED !! ";
                            // sails.log.info("upload  UPLOADED -> Err:", err, "File: ");
                            //   'mogrify -resize 80x80 -background white -gravity center  -format jpg -path ..\'+gallery[1]+' thumbs *.jpg';
                            //  To resize an image to a width of 40px while maintaining aspect ratio: gm("img.png").resize(40)
                            //  To resize an image to a height of 50px while maintaining aspect ratio: gm("img.png").resize(null, 50)
                            //  To resize an image to a fit a 40x50 rectangle while maintaining aspect ratio: gm("img.png").resize(40, 50)
                            //  To override the image's proportions and force a resize to 40x50: gm("img.png").resize(40, 50, "!")


                            message: files.length + ' file(s) uploaded successfully!'
                        }
                    );
                    //return res.json(200, {
                    //
                    //    message: files.length + ' file(s) uploaded successfully!'
                    //
                    //});

                    //gm('/path/to/image.jpg')
                    //    .resize(353, 257)
                    //    .autoOrient()
                    //    .write(writeStream, function (err) {
                    //        if (!err) console.log(' hooray! ');
                    //    });


                });
        } else {
            // sails.log.verbose(__filename + ':' + __line + ' [File not uploaded: ', errorMessages.join(' - ') + ']');
            sails.log.info("File not  uploaded -> Err:", errorMessages.join(' - '));
            return res.json(400, {
                message: 'File not uploaded: ' + errorMessages.join(' - ')
            });
        }

    },
    uploadPdf: function (req, res) {
        // using special below
        var fn = _saveAs(req.file('file')._files[0].stream);
        var upload = req.file('file')._files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount,
            validated = true,
            errorMessages = [],
            fileParams = {},
            settings = {
                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                //maxBytes: 100 * 1024 * 1024
                maxBytes: 10000000
            };

        // Check file type
        if (_.indexOf(settings.allowedTypes, headers['content-type']) === -1) {
            validated = false;
            errorMessages.push('Wrong filetype (' + headers['content-type'] + ').');
        }
        // Check file size
        if (byteCount > settings.maxBytes) {
            validated = false;
            errorMessages.push('Filesize exceeded: ' + byteCount + '/' + settings.maxBytes + '.');
        }
        // Upload the file.
        if (validated) {
            sails.log.info("validated");

            req.file('file')
                .upload({
                    // You can apply a file upload limit (in bytes)
                    dirname: '../../api/docs/',
                    // maxBytes: 10000000
                    maxBytes: settings.maxBytes
                    , saveAs: fn
                    //,  saveAs : _saveAs bug after 10. with function
                },
                function (err, files) {
                    sails.log.info("bFILE UPLOADED -> Err:", err, "File: ");//, file);

                    if (err) {
                        return res.serverError(err);
                    }

                    return res.json(200, {

                        message: files.length + ' file(s) uploaded successfully!'
                    });

                });
        } else {
            sails.log.info("not  UPLOADED -> Err:", errorMessages.join(' - '));
            return res.json(400, {
                message: 'File not uploaded: ' + errorMessages.join(' - ')
            });
        }

    },
    uploadSpecial: function (req, res) {
        var fn = req.file('file')._files[0].stream.filename;
        sails.log.info("uploadSpecial");
        var upload = req.file('file')._files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount,
            validated = true,
            errorMessages = [],
            fileParams = {},
            settings = {
                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                maxBytes: 100 * 1024 * 1024
            };

        // Check file type
        if (_.indexOf(settings.allowedTypes, headers['content-type']) === -1) {
            validated = false;
            errorMessages.push('Wrong filetype (' + headers['content-type'] + ').');
        }
        // Check file size
        if (byteCount > settings.maxBytes) {
            validated = false;
            errorMessages.push('Filesize exceeded: ' + byteCount + '/' + settings.maxBytes + '.');
        }
        // Upload the file.
        if (validated) {

            sails.log.info("validated");

            req.file('file')
                .upload({
                    // You can apply a file upload limit (in bytes)
                    dirname: '../../api/docs/financial/',
                    maxBytes: 10000000
                    , saveAs: fn

                },
                function (err, files) {
                    sails.log.info("uploadSpecial UPLOADED -> Err:", err, "File: ");//, file);

                    if (err) {
                        return res.serverError(err);
                    }

                    return res.json(200, {

                        message: files.length + ' file(s) uploaded successfully!'

                    });

                });
        } else {
            // sails.log.verbose(__filename + ':' + __line + ' [File not uploaded: ', errorMessages.join(' - ') + ']');
            sails.log.info("not  UPLOADED -> Err:", errorMessages.join(' - '));
            return res.json(400, {
                message: 'File not uploaded: ' + errorMessages.join(' - ')
            });
        }

    },
    uploadCrewredactor: function (req, res) {

        var fn = req.file('file')._files[0].stream.filename;
        sails.log.info("uploadCrew");
        var upload = req.file('file')._files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount,
            validated = true,
            errorMessages = [],
            fileParams = {},
            settings = {
                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                // maxBytes: 100 * 1024 * 1024
                maxBytes: 1000 * 1024 * 1024
            };

        // Check file type
        if (_.indexOf(settings.allowedTypes, headers['content-type']) === -1) {
            validated = false;
            errorMessages.push('Wrong filetype (' + headers['content-type'] + ').');
        }
        // Check file size
        if (byteCount > settings.maxBytes) {
            validated = false;
            errorMessages.push('Filesize exceeded: ' + byteCount + '/' + settings.maxBytes + '.');
        }
        // Upload the file.
        if (validated) {

            sails.log.info("validated");

            req.file('file')
                .upload({
                    // You can apply a file upload limit (in bytes)
                    dirname: '../../api/docs/crew/',
                    maxBytes: 10000000
                    , saveAs: fn

                },
                function (err, files) {
                    sails.log.info("bFILE UPLOADED -> Err:", err, "File: ");//, file);

                    if (err) {
                        return res.serverError(err);
                    }
                    return res.json(200, {
                        // required for redactor
                        filelink: 'images/crew/' + fn

                    });

                });
        } else {
            // sails.log.verbose(__filename + ':' + __line + ' [File not uploaded: ', errorMessages.join(' - ') + ']');
            sails.log.info("File not  uploaded -> Err:", errorMessages.join(' - '));
            return res.json(400, {
                message: 'File not uploaded: ' + errorMessages.join(' - ')
            });
        }

    },
    uploadCrew: function (req, res) {

        var fn = req.file('file')._files[0].stream.filename;
        sails.log.info("uploadCrew");
        var upload = req.file('file')._files[0].stream,
            headers = upload.headers,
            byteCount = upload.byteCount,
            validated = true,
            errorMessages = [],
            fileParams = {},
            settings = {
                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                maxBytes: 100 * 1024 * 1024
            };

        // Check file type
        if (_.indexOf(settings.allowedTypes, headers['content-type']) === -1) {
            validated = false;
            errorMessages.push('Wrong filetype (' + headers['content-type'] + ').');
        }
        // Check file size
        if (byteCount > settings.maxBytes) {
            validated = false;
            errorMessages.push('Filesize exceeded: ' + byteCount + '/' + settings.maxBytes + '.');
        }
        // Upload the file.
        if (validated) {

            sails.log.info("validated");

            req.file('file')
                .upload({
                    // You can apply a file upload limit (in bytes)
                    dirname: '../../api/docs/crew/',
                    maxBytes: 10000000
                    , saveAs: fn

                },
                function (err, files) {
                    sails.log.info("upload crew UPLOADED -> Err:", err, "File: ");//, file);

                    if (err) {
                        return res.serverError(err);
                    }
                    return res.json(200, {
                        // required for redactor
                        filelink: 'images/crew/' + fn

                    });
                    //return res.json(200, {
                    //
                    //    message: files.length + ' file(s) uploaded successfully!'
                    //
                    //});

                });
        } else {
            // sails.log.verbose(__filename + ':' + __line + ' [File not uploaded: ', errorMessages.join(' - ') + ']');
            sails.log.info("File not  uploaded -> Err:", errorMessages.join(' - '));
            return res.json(400, {
                message: 'File not uploaded: ' + errorMessages.join(' - ')
            });
        }

    },

    getGallery: function (req, res) {
        console.log('getGallery ')
        var files = [];
        var dd = '../MeansBasePT3/api/docs/crew';//workds
        var walker = walk.walk(dd, {followLinks: false});
        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            //files.push(root + '/' + stat.name);
            files.push('imagescrew/' + stat.name);
            next();
        });

        walker.on('end', function () {
            console.log(files);
            res.send(files);
        });
    },
    getGalleryNew: function (req, res) {
        console.log('getGalleryNew ')
        var files = [];
        var dd = '../MeansBasePT3/api/docs/crew';//workds
        var walker = walk.walk(dd, {followLinks: false});
        walker.on('file', function (root, stat, next) {
            // Add this file to the list of files
            //files.push(root + '/' + stat.name);
            //       {"url":"img/sea.jpg", "title" : "Presenting big pictures", "description":"Showing fullscreen images to present all your best!"},
            files.push({
                url: 'imagescrew/' + stat.name,
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
    _config: {}
};

//
///* PARSE THUMBNAIL FILE NAME TO GET A SAFE NAME */
//
///* PARSE THUMBNAIL FILE NAME TO GET A SAFE NAME */
function safeFilename(name) {
    //4-16-2015  name = name.replace(/ /g, '-');// replace space with a dash

    // name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
    name = name.replace(/[^A-Za-z0-9-_\.]/g, ' ');
    name = name.replace(/\.+/g, '.');
    name = name.replace(/-+/g, '-');
    name = name.replace(/_+/g, '_');
    console.log('name ', name)
    return name;
}

function _saveAs(file) {
    //return safeFilename(file.filename);
    //  console.log('file ',file.filename)
    sails.log.info("_saveAs  ", "File: ", file.filename);
    return safeFilename(file.filename);
    // return file.filename;
    //var fn = req.file('file')._files[0].stream.filename;
}
//
///* CREATE FOLDER BOOK TO SAVE THE THUMBNAIL */
//function createBookFolder(book, file_name, req, res){
//    var dir_path  = _G.book_url;
//    var book_path = dir_path + "/" + book.id;
//    try {
//        mkdirp.sync(book_path, 0755);
//    } catch (err) {
//        return res.serverError(err);
//    }
//    createFile(file_name, book.id, book_path, req, res);
//}
//
///* UPLOAD THE FILE */
//function createFile(file_name, book_id, book_path, req, res){
//    req.file(file_name).upload({
//        dirname: book_path,
//        saveAs : _saveAs
//    }, function(err, file){
//        /* IN 0.10.2 AND NEWEST VERSION DOESN'T ARRIVE HERE */
//        sails.log.info("aFILE UPLOADED -> Err:", err, "- File: ", file);
//        if(err) return res.send(500, err);
//        /* IF NO FILE REDIRECT TO BOOK EDIT TEMPLATE */
//        if(!file.length) return res.redirect("book/edit/" + book_id);
//        var file_url = "/" + book_path + "/" + safeFilename(file[0].filename);
//        /* UPDATE BOOK THUMBNAIL URL IN DB */
//        return updateBookUrl(book_id, file_url, res);
//    });
//}
//
///* UPLOAD THE NEW THUMBNAIL AND IF EXIST DELETE THE OLD THUMBNAIL */
//function updateFile(file_name, book, book_path, req, res){
//    req.file(file_name).upload({
//        dirname: book_path,
//        saveAs : _saveAs
//    }, function(err, file){
//        /* IN 0.10.2 AND NEWEST VERSION DOESN'T ARRIVE HERE */
//        sails.log.info("bFILE UPLOADED -> Err:", err, "File: ", file);
//        if(err) return res.send(500, err);
//        /* IF NO FILE REDIRECT TO BOOK EDIT TEMPLATE */
//        if(!file.length) return res.redirect("book/edit/" + book.id);
//        /* CHECK IF OLD FILE EXIST AND DELETE IN THAT CASE */
//        var old_file_name = book.thumbnail.split("/")[book.thumbnail.split("/").length - 1];
//        if(book.thumbnail !== _G.default_cover && safeFilename(file[0].filename) !== safeFilename(old_file_name)){
//            if(fs.existsSync(book.thumbnail.substr(1))){
//                fs.unlinkSync(book.thumbnail.substr(1));
//            }
//        }
//        var file_url = "/" + book_path + "/" + safeFilename(file[0].filename);
//        /* UPDATE BOOK THUMBNAIL URL IN DB */
//        return updateBookUrl(book.id, file_url, res);
//    });
//}
//
///* UPDATE BOOK THUMBNAIL URL IN DB */
//function updateBookUrl(book_id, file_url, res){
//    Book.update({id: book_id}, {thumbnail: file_url}).exec(function(err, book_updated){
//        if(err) return res.serverError(err);
//        return res.redirect("book/edit/" + book_id);
//    });
//}
//
///* DELETE BOOK FOLDER IN RECURSIVE MODE */
//function deleteFolderRecursive(path) {
//    if(fs.existsSync(path)){
//        fs.readdirSync(path).forEach(function(file,index){
//            var curPath = path + "/" + file;
//            if(fs.lstatSync(curPath).isDirectory()) {
//                deleteFolderRecursive(curPath);
//            } else {
//                fs.unlinkSync(curPath);
//            }
//        });
//        fs.rmdirSync(path);
//    }
//}
//
///* IN FILE UPLOAD SAVE WITH A SAFE FILENAME */
//function _saveAs(file){
//    //return safeFilename(file.filename);
//  // //  console.log('file ',file.filename)
//    sails.log.info("file UPLOADED ",  "File: ", file);
//    return safeFilename(file.filename);
//    //var fn = req.file('file')._files[0].stream.filename;
//}

function _saveAs(file) {
    //return safeFilename(file.filename);
    // //  console.log('file ',file.filename)
    sails.log.info("_saveAs  ", "File: ", file.filename);
    return safeFilename(file.filename);
    // return file.filename;
    //var fn = req.file('file')._files[0].stream.filename;
}