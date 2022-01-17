const categoryModel = require("../models/category");

module.exports =    {
    listCategories: function(req, res){
        // Get data from model
        var resBody = {};
        categoryModel.listCategories([], function(err, result){
            if(err){
                console.log(err);
                resBody.success = false;
                resBody.message = "Error in fetchinig categories !!";
                return res.status(500).send(resBody);
            }
            resBody.success = true;
            resBody.results = result;
            res.status(200).send(resBody);
        });
    }
};