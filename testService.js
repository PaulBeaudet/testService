// testService.js service for testing the services

var test = {
    response: function(){
        return function(req, res){
            // res.send(process.env.MESSAGE);
            res.send('try again');
        }
    },
    otherRes: function(){
        return function(req, res){
            // res.send(process.env.MESSAGE);
            res.send('this is another test');
        }
    }
}

var serve = {                                                // handles express server setup
    express: require('express'),                             // server framework library
    parse: require('body-parser'),                           // middleware to parse JSON bodies
    theSite: function (){                                    // methode call to serve site
        var app = serve.express();                           // create famework object
        var http = require('http').Server(app);              // http server for express framework
        app.use(serve.parse.json());                         // support JSON bodies
        var router = serve.express.Router();                 // create express router object to add routing events to
        router.get('/', test.response());                    // real listener post route
        router.get('/test', test.otherRes());
        app.use(router);                                     // get express to user the routes we set
        return http;
    }
};

var http = serve.theSite();                                  // set express middleware and routes up
http.listen(process.env.PORT);                               // listen on specified PORT enviornment variable
