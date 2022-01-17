const product = require("../models/product");
const orderDetails = require("../models/orderDetails");
const orderItems = require("../models/orderItems");

module.exports = {
    getOrderDetails: function(req, res){
        let body = req.body;
        console.log("Response Body: ",body);
        if(body.userid){
            var resBody = {};
            orderDetails.getOrderDetails(body, function(err, result){
                if(err){
                    resBody.success = false;
                    resBody.message = "Error in fetching User Order Details";
                    console.log(resBody.message,"\n", err);
                    return res.status(500).send(resBody);
                }
                
                resBody.success  = true;
                resBody.results = result;
                res.status(200).send(resBody);
            });
        }
    },

    createOrder: function(req, res){
        let data = req.body;
        let resBody = {
            success: false,
            message: "Invalid params for creating order"
        };

        if(data.userid, data.productid){
            product.getProductDetails(data, (err, productResult)=>{
                if(err){
                    resBody.success = false;
                    resBody.message = "Error fetching product details !!";
                    return res.status(500).send(resBody);
                }
                if(productResult.length > 0){
                    // Check if order already exists
                    orderDetails.getOrderDetails(data, (err, orderResult)=>{
                        if(err){
                            resBody.success = false;
                            resBody.message = "Error fetching order details";
                            return res.status(500).send(resBody);
                        }

                        if(orderResult.length > 0){
                            // Product already added to cart, so just update quantity
                            data.total = parseInt(data.quantity, 10) * parseInt(productResult[0].Price, 10);
                            data.orderid = orderResult[0].orderId;

                            console.log(data.total, productResult[0], data.quantity);

                            orderDetails.editOrder(data, (err, editOrderResult)=>{
                                if(err){
                                    resBody.success = false;
                                    resBody.message = "Error changing order details";
                                    return res.status(500).send(resBody);
                                }
                                orderItems.editOrderItem(data, (err, orderItemResult)=>{
                                    if(err){
                                        resBody.success = false;
                                        resBody.message = "Error changing order items";
                                        return res.status(500).send(resBody);
                                    }
                                    resBody.success = true;
                                    resBody.message = "Successfully added order";
                                    resBody.results = {
                                        orderid : orderResult[0].orderId
                                    };

                                    res.status(201).send(resBody);
                                });
                            });
                        }else{
                            // add product to cart
                            data.total = parseInt(data.quantity, 10) * parseInt(productResult[0].Price, 10);

                            // console.log(data.total, productResult[0], data.quantity);

                            orderDetails.addOrder(data, (err, addOrderResult)=>{
                                if(err){
                                    resBody.success = false;
                                    resBody.message = "Error adding order details";
                                    return res.status(500).send(resBody);
                                }

                                // console.log("Order Details: ", addOrderResult);
                                data.orderid = addOrderResult.insertId;

                                // Now add order item
                                orderItems.addOrderItem(data, (err, orderItemResult)=>{
                                    if(err){
                                        resBody.success = false;
                                        resBody.message = "Error adding order item";
                                        return res.status(500).send(resBody);
                                    }
                                    resBody.success = true;
                                    resBody.message = "Successfully added order";
                                    resBody.results = {
                                        orderid : addOrderResult.insertId
                                    };

                                    res.status(201).send(resBody);
                                });

                            });
                        }

                    });
                }else{
                    resBody.success = false;
                    resBody.message = "Product details not found !!";
                    return res.status(500).send(resBody);
                }
            });

        }else{
            res.status(400).send(resBody);
        }
    }
};