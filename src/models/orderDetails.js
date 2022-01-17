const sqlConnection = require("../services/sqlConnection");

function listOrderDetails(data, cb){
    // Get Every Order Related to user
    var sql = `SELECT * FROM
                    Users AS u INNER JOIN OrderDetails AS od
                        ON u.ID = od.UserID
                    INNER JOIN OrderItems AS oi
                        ON od.ID = oi.OrderID
                    INNER JOIN Products AS p
                        ON oi.ProductID = p.ID
                    WHERE u.ID = ?`;
    var values = [];
    values.push(data.userid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function findOrderByUser(data, db){
    var sql = `SELECT ID as OrderID, Total 
                from OrderDetails WHERE UserID = ? AND OrderStatus = 1 LIMIT 1`;
    var values = [];
    values.push(data.userid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function addOrder(data, cb){
    var sql = `INSERT INTO OrderDetails(Total, UserID, OrderStatus, CreatedAt, UpdatedAt)
                VALUES(?, ?, 1, now(), now())`;
    var values = [];
    values.push(data.total);
    values.push(data.userid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function editOrder(data, cb){
    var sql = `UPDATE OrderDetails SET Total = ?, OrderStatus = ?, UpdatedAt = now() WHERE ID = ?`;
    var values = [];

    if(data.payment){
        sql = `UPDATE OrderDetails SET OrderStatus = ?, UpdatedAt = now() WHERE ID = ?`;
        values.push(2);
    }else{
        values.push(data.total);
        values.push(1);
    }
    values.push(data.orderid);

    console.log(sql, values);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function getOrderDetails(data, cb){
    var sql = `SELECT od.ID AS orderId, od.Total AS total, p.ID AS productId,
                p.Name AS productName, p.price AS price, oi.Quantity AS quantity
                FROM OrderDetails AS od LEFT JOIN OrderItems AS oi
                ON od.ID = oi.OrderID LEFT JOIN Products AS p
                ON p.ID = oi.ProductID WHERE od.UserID = ? AND od.OrderStatus = 1 AND oi.ProductID = ?`;
    var values = [];

    values.push(data.userid, data.productid);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

module.exports = {listOrderDetails, findOrderByUser, addOrder, editOrder, getOrderDetails};