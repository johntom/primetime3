// In mandrill_wrapper.js
//var mandrill_client = new mandrill.Mandrill('2Ffn0MnQBHnIVTRYMOV4qA');
// mandrill_client = new mandrill.Mandrill(process.env.MANDRILL_APIKEY),
//Host smtp.mandrillapp.com
//Port 587
//SMTP Username dentalsave@taktical.co
//SMTP Password any valid API key
//password: 568broadway
//SMTP Username dentalsave@taktical.co
// user: primetime3@optonline.net
// password: @)buBBaLevi12
// id = 5CTx34Ap1BS5cAKtP0xfwg
module.exports = (function () {
    var mandrill = require('mandrill-api/mandrill'),
        mandrill_client = new mandrill.Mandrill('5CTx34Ap1BS5cAKtP0xfwg'),
        self = {};

    self.send = function (options) {
        // self.send = function(fromName, fromEmail, to, replyToEmail, subject, text, html,tags,vars,options) {

       console.log('======================== ',options);//.to.name); //options.replyToEmail.name );//.name.CLIENTIDoptions.vars)
       // console.log('========================',options.replyToEmail[0].name.CLIENTID, options.replyToEmail)
// Should be ======================== reply-c079401@dentsave.com


        var message = {
            // "html": html,//'<h1>This is a header</h1>',
            //  "slug": "examplejrt1-template",
            "html": null,
            "text": null,
            "subject": options.subject,
            "from_email": options.fromEmail,
            "from_name": options.fromName,
            "to": options.to,
            //"subject": subject,
            //"from_email": fromEmail,
            //"from_name": fromName,
            //"to": to,
            //  "Reply-To": "message.reply@example.com"
            "headers": {
                //"Reply-To": options.replyToEmail
//                "Reply-To": 'reply-'+options.replyToEmail[0].name+'@dentsave.com'
              //  "Reply-To": 'reply-'+options.replyToEmail[0].name.CLIENTID+'@dentsave.com'
              //  "Reply-To": 'reply-'+options.replyToEmail.name.CLIENTID+'@dentsave.com'

               // "Reply-To": 'reply@dentalsave.com'
                "Reply-To": 'primetime3@optonline.net'
               // "Reply-To": 'reply-'+ options.fromEmail+'@dentsave.com'
               // "Reply-To": 'reply-'+ options.to.name+'@dentsave.com'


            },

            "important": false,
            "track_opens": null,
            "track_clicks": null,
            "auto_text": null,
            "auto_html": null,
            "inline_css": null,
            "url_strip_qs": null,
            "preserve_recipients": null,
            "bcc_address": null,
            //     "bcc_address": to,
            "tracking_domain": null,
            "signing_domain": null,
            "merge": true,


            "global_merge_vars": [
                {
                    "name": "var1",
                    "content": "Global Value 1"
                }
            ],
            "merge_vars": options.vars,

            "tags": [options.tags],
            "google_analytics_domains": [],
            "google_analytics_campaign": null,
            "metadata": null,
            "recipient_metadata": [],
            "attachments": [],
            "images": []
        };
        var async = false;
        var ip_pool = null;
        var send_at = null;
        mandrill_client.messages.sendTemplate({
            "template_name": options.templatename,
            //"template_name": "Examplejrt1 Template",
            "template_content": [],
            "message": message,
            "async": async,
            "ip_pool": ip_pool,
            "send_at": send_at
        }, function (result) {
            console.log('Mandrill API called.', result);

        }, function (e) {
            console.error('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        });
    };

    return self;
})();


//"merge_vars": [
//    {
//        "rcpt": "jrt@gtz.com",
//        "vars": [
//            {
//                "name": "fname",
//                "content": "John"
//            },
//            {
//                "name": "lname",
//                "content": "Smith"
//            }
//        ]
//    }
//],
//"merge_vars": [
//    {
//        "rcpt": "jrt@gtz.com",
//        "vars": [
//            {
//                "name": "firstname",
//                "content": "John firstname"
//            },
//            {
//                "name": "lastname",
//                "content": "Smith lastname"
//            },
//    {
//        "name": "clientid",
//        "content": "10090"
//    }
//        ]
//    }
//],
