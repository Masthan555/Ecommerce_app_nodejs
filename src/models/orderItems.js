const sqlConnection = require("../services/sqlConnection");

function addOrderItem(data, cb){
    var sql = `INSERT INTO OrderItems(OrderID, ProductID, Quantity, CreatedAt, UpdatedAt)
                VALUES (?, ?, ?, now(), now())`;

    var values = [];
    values.push(data.orderid);
    values.push(data.productid);
    values.push(data.quantity);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function editOrderItem(data, cb){
    var sql = `UPDATE OrderItems
                SET Quantity = ?, UpdatedAT = now()
                WHERE OrderID = ? AND ProductID = ?`;
    var values = [];
    values.push(data.quantity);
    values.push(data.orderid);
    values.push(data.productid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function deleteOrderItem(data, cb){
    var sql = `DELETE FROM OrderItems
                WHERE OrderID = ? AND ProductID = ?`;
    var values = [];
    values.push(data.orderid);
    values.push(data.productid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function getOrderItems(data, cb){
    var sql = `SELECT * FROM OrderItems
                WHERE OrderID = ? AND ProductID = ?`;
    var values = [];
    values.push(data.orderid);
    values.push(data.productid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

module.exports = {addOrderItem, editOrderItem, deleteOrderItem, getOrderItems};