const jest_mock = require("jest-mock");

function mockRequest(){
    const req = {};

    req.body = jest_mock.fn().mockReturnValue(req);

    return req;
}

function mockResponse(){
    const res = {};

    res.send = jest_mock.fn().mockReturnValue(res);
    res.status = jest_mock.fn().mockReturnValue(res);
    // res.json = jest_mock.fn().mockReturnValue(res);
    return res;
}

module.exports = {mockRequest, mockResponse};