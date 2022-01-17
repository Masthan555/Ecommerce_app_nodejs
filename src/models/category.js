const sqlConnection = require("../services/sqlConnection");

function listCategories(data, cb) {
    var sql = "SELECT ID as categoryID, Name as name FROM Categories";
    var data = [];
    sqlConnection.executeQuery(sql, data, function (err, results) {
        cb(err, results);
    });
}

module.exports = {listCategories};