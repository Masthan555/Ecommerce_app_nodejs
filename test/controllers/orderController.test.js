const orderController = require("../../src/controllers/orderController");
const orderDetails = require("../../src/models/orderDetails");
const orderItems = require("../../src/models/orderItems");
const product = require("../../src/models/product");
const { mockRequest, mockResponse} = require("../mocker");
const jest_mock = require("jest-mock");

// tests for create order
const productPayload = [
    {
        ProductID: 1,
        Name: "Some product",
        Description: "Product description",
        Price: 10000
    }
];
const orderDetailsPayload = [
    {
        orderId: 1
    }
];
const addOrderPayload = {
    insertId: 1
};

test("Invalid Params", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    let spy = jest_mock.spyOn(product, "getProductDetails").mockImplementation((data, cb)=>{
        cb(null, productPayload);
    });

    await orderController.createOrder(req, res);
    expect(spy).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
        success: false,
        message: "Invalid params for creating order"
    });
});

test("Creates an new order", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
        userid: 133,
        productid: 48,
        quantity: 2
    };

    let productSpy = jest_mock.spyOn(product, "getProductDetails").mockImplementation((data, cb)=>{
        cb(null, productPayload);
    });
    let orderDetailsSpy = jest_mock.spyOn(orderDetails, "getOrderDetails").mockImplementation((data, cb)=>{
        cb(null, []);
    });
    let addOrderSpy = jest_mock.spyOn(orderDetails, "addOrder").mockImplementation((data, cb)=>{
        cb(null, addOrderPayload);
    });
    let addOrderItemSpy = jest_mock.spyOn(orderItems, "addOrderItem").mockImplementation((data, cb)=>{
        cb(null, null);
    });

    await orderController.createOrder(req, res);

    expect(productSpy).toHaveBeenCalled();
    expect(orderDetailsSpy).toHaveBeenCalled();
    expect(addOrderSpy).toHaveBeenCalled();
    expect(addOrderItemSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: "Successfully added order",
        results: {
            orderid: addOrderPayload.insertId
        }
    });
})

test("Edits an existing order", async ()=>{
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
        userid: 133,
        productid: 48,
        quantity: 2
    };

    let productSpy = jest_mock.spyOn(product, "getProductDetails").mockImplementation((data, cb)=>{
        cb(null, productPayload);
    });
    let orderDetailsSpy = jest_mock.spyOn(orderDetails, "getOrderDetails").mockImplementation((data, cb)=>{
        cb(null, orderDetailsPayload);
    });
    let editOrderSpy = jest_mock.spyOn(orderDetails, "editOrder").mockImplementation((data, cb)=>{
        cb(null, null);
    });
    let editOrderItemSpy = jest_mock.spyOn(orderItems, "editOrderItem").mockImplementation((data, cb)=>{
        cb(null, null);
    });

    await orderController.createOrder(req, res);

    expect(productSpy).toHaveBeenCalled();
    expect(orderDetailsSpy).toHaveBeenCalled();
    expect(editOrderSpy).toHaveBeenCalled();
    expect(editOrderItemSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
        success: true,
        message: "Successfully added order",
        results: {
            orderid: addOrderPayload.insertId
        }
    });
});