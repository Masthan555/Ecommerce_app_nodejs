const product = require("../models/product");

let content = {
    addProduct: (req, res)=>{
        let data = req.body;
        let resBody = {};
        // console.log("Adding Product");
        if(data.name && data.description && data.price && data.vendorID && data.categoryID){
            product.addProduct(data, (err, result)=>{
                if(err){
                    resBody.success = false;
                    resBody.message = "Error in adding product !!";
                    return res.status(500).send(resBody);
                }
                resBody.success = true;
                resBody.message = "Product Added Successfully :)";
                res.status(201).send(resBody);
            });
        }else{
            resBody.success = false;
            resBody.message = "Please provide all valid data !!";
            return res.status(400).send(resBody);
        }
    },

    listProducts: (req, res)=>{
        let data = req.body;
        var resBody = {};
        if(data.categoryID){
            product.listProducts(data, (err, result)=>{
                if(err){
                    resBody.success = false;
                    resBody.message = "Error in fetching products !!";
                    return res.status(500).send(resBody);
                }

                resBody.success = true;
                resBody.results = result;

                res.status(200).send(resBody);
            });
        }else{
            resBody.success = false;
            resBody.message = "Please provide Category ID !!";
            return res.status(400).send(resBody);
        }
    }
};

module.exports = content;