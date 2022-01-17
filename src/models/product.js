const sqlConnection = require("../services/sqlConnection");

function addProduct(data, cb){
    let sql = `INSERT INTO Products(Name, Description, Price, VendorID, CategoryID, CreatedAt, UpdatedAt)
                    VALUES(?, ?, ?, ?, ?, now(), now())`;
    let values = [];
    values.push(data.name);
    values.push(data.description);
    values.push(data.price);
    values.push(data.vendorID);
    values.push(data.categoryID);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function listProducts(data, cb){
    let sql = "SELECT ID AS ProductID, Name, Description, Price FROM Products WHERE CategoryID = ?";
    let values = [];
    values.push(data.categoryID);

    sqlConnection.executeQuery(sql, values, (err, result)=>{
        cb(err, result);
    });
}

function getProductDetails(data, cb){
    let sql = "SELECT ID AS ProductID, Name, Description, Price FROM Products WHERE ID = ?";
    let values = [];
    values.push(data.productid);

    sqlConnection.executeQuery(sql, values, (err, result)=>{
        cb(err, result);
    });
}

module.exports = {addProduct, listProducts, getProductDetails};