const sqlConnection = require("../services/sqlConnection");

function signupUser(data, cb){
    var sql = "INSERT INTO Users(Username, Password, UserType, CreatedAt, UpdatedAt) VALUES (?,?,?,now(), now())";
    var params = [];
    params.push(data.username);
    params.push(data.password);
    params.push(2);

    sqlConnection.executeQuery(sql, params, function(err, results){
        cb(err, results);
    });
}

function getUserDetails(data, cb){
    var sql = "SELECT * FROM Users WHERE Username=?";
    var values = [];
    values.push(data.username);

    sqlConnection.executeQuery(sql, values, function(err, result){
        cb(err, result);
    });
}

function getUserById(data, cb){
    if(data.id){
        let sql = "SELECT * FROM Users WHERE ID = ?";
        let values = [];
        values.push(data.userid);

        sqlConnection.executeQuery(sql, values, (err, result)=>{
            cb(err, result);
        });
    }
}

function loginUser(data, cb){
    var sql = "SELECT * FROM Users WHERE Username=? AND Password=?";
    var params = [data.username, data.password];

    sqlConnection.executeQuery(sql, params, function(err, result){
        cb(err, result);
    });
}

let obj = {username: "George"};

module.exports = {signupUser, getUserDetails, getUserById, loginUser};