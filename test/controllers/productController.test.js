const productController = require("../../src/controllers/productController");
const product = require("../../src/models/product");
const {mockRequest, mockResponse} = require("../mocker");
const jest_mock = require("jest-mock");

const testPayload = [
    {
        "ProductID": "1",
        "Name": "Nokia 1100",
        "Description": "3",
        "Price": 2
    },
    {
        "ProductID": "2",
        "Name": "Nokia 1120",
        "Description": "3",
        "Price": 2
    }
];

// Tests for list products
test("Not received category ID from request", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    const spy = jest_mock.spyOn(product, "listProducts").mockImplementation((data, cb)=>{
        cb(null, null);
    });

    await productController.listProducts(req, res);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "Please provide Category ID !!"
    });

});
test("Positive Test Working Fine for listProducts", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    // mock controller related things in here
    req.body = {
        categoryID: "2"
    };

    const spy = jest_mock.spyOn(product, "listProducts").mockImplementation((data, cb)=>{
        cb(null, testPayload);
    });

    await productController.listProducts(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        success : true,
        results: testPayload
    });
    
});
test("Error received from DB", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    // mock controller related things in here
    req.body = {
        categoryID: "2"
    };

    const spy = jest_mock.spyOn(product, "listProducts").mockImplementation((data, cb)=>{
        cb(new Error("Error From DB"), null);
    });

    await productController.listProducts(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        success : false,
        message: "Error in fetching products !!"
    });
    
});


// Tests for add product
test("Product data not received from request", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    const spy = jest_mock.spyOn(product, "addProduct").mockImplementation((data, cb)=>{
        cb(null, null);
    });

    await productController.addProduct(req, res);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "Please provide all valid data !!"
    });
});

test("Product Added Successfully", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    // mock controller related things in here
    req.body = {
        name: "Some Product",
        description: "Some Description",
        price: 2000,
        vendorID: 2,
        categoryID: 2
    };

    const spy = jest_mock.spyOn(product, "addProduct").mockImplementation((data, cb)=>{
        cb(null, req.body);
    });

    await productController.addProduct(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: "Product Added Successfully :)"
    });
});
test("Received Error from DB while adding Product", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    // mock controller related things in here
    req.body = {
        name: "Some Product",
        description: "Some Description",
        price: 2000,
        vendorID: 2,
        categoryID: 2
    };

    const spy = jest_mock.spyOn(product, "addProduct").mockImplementation((data, cb)=>{
        cb(new Error("Some Error from DB"), null);
    });

    await productController.addProduct(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "Error in adding product !!"
    });
});

// test whether this "test file" is working or not using below code
/*
it("should be TRUE",()=>{
    expect(2+2).toBe(3);
});
*/