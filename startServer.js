/**
 * Created by thierryn1 on 8/1/2015.
 */
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({port: 80});

server.route({
    method: 'GET',
    path: '/filters/{filter_id?}',
    handler: function (request, reply) {
        var responsePayload;
        var response;
        if (request.params.filter_id == null) {
            responsePayload = {status: "FAILURE"};
            response = reply(responsePayload);
            response.statusCode = "400";
        };
        if (request.params.filter_id == "1") {
            responsePayload = {
                status: "SUCCESS",
                data: {
                    id: "1",
                    type: "SPONSOR",
                    value: "mysponsor"
                }
            };
            response = reply(responsePayload);
            response.statusCode = "200";
        };
        if (request.params.filter_id == "2") {
            responsePayload = {
                status: "SUCCESS",
                errors: [
                    {
                        code: 1,
                        name: "Not found",
                        severity: 3
                    }
                ]
            }
            response = reply(responsePayload);
            response.statusCode = "200";
        };


    }
});

server.route({
    method: 'POST',
    path: '/filters',
    handler: function (request, reply) {
        var response;
        var responsePayload;
        if (request.payload != null) {
            responsePayload = {
                status: "SUCCESS",
                data: {
                    code: 1,
                    type: request.payload.data.type,
                    value: request.payload.data.value
                }
            };
            response = reply(responsePayload);
            response.statusCode = "201";
        } else {
            responsePayload = {status: "FAILURE"};
            response = reply(responsePayload);
            response.statusCode = "400";
        }

    }
});

server.route({
    method: 'DELETE',
    path: '/filters/{filter_id?}',
    handler: function (request, reply) {
        var responsePayload;
        var response;
        if (request.params.filter_id == null || request.params.filter_id == "2") {
            responsePayload = {
                status: "FAILURE",
                errors: [
                    {
                        code: 1,
                        name: "Not found",
                        severity: 3
                    }
                ]
            }
            response = reply(responsePayload);
            response.statusCode = "400";
        };
        if (request.params.filter_id == "1") {
            response = reply();
            response.statusCode = "204";
        };
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});