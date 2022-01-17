const categoryController = require("../../src/controllers/categoryController");
const category = require("../../src/models/category");
const { mockRequest, mockResponse } = require("../mocker");
const jest_mock = require("jest-mock");

const testPayload = [
    {
        "categoryID": 1,
        "name": "Electronics"
    },
    {
        "categoryID": 2,
        "name": "Fashion"
    },
];

// Tests for getting all categories
test("Error received from model while fetching categories", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    const spy = jest_mock.spyOn(category, "listCategories").mockImplementation((data, cb)=>{
        cb(new Error("Error while fetching categories"), null);
    });

    await categoryController.listCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "Error in fetchinig categories !!"
    });
});
test("Successfully fetched categories", async()=>{
    const req = mockRequest();
    const res = mockResponse();

    const spy = jest_mock.spyOn(category, "listCategories").mockImplementation((data, cb)=>{
        cb(null, testPayload);
    });

    await categoryController.listCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        success: true,
        results: testPayload
    });
});