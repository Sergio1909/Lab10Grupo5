const mysql = require('mysql2');

exports.handler = function(event, context, callback) {


    var response = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    var conn = mysql.createConnection({
        host: "database-8.cctzf0u4dbzt.us-east-1.rds.amazonaws.com",
        user: "admin",
        password: "Xvj7AIfP8ESx91UMntEA",
        port: 3306,
        database: "teletok_lambda"

    });


    conn.connect(function(error) {
        if (error) {
            conn.end(function() {

                response.statusCode = 400;
                response.body = JSON.stringify({
                    "estado": "error",
                    "msg": error
                });


                callback(error, response);

            });

        }
        else {
            console.log(event);
            if (event.queryStringParameters != null) {
                var id = event.queryStringParameters.id;


                var sql = "SELECT p.id,p.description,p.creation_date,u.username,count(pc.message) as "comment count",pc.id,pc.message,pc.user_id.username FROM post p"+
                "inner join teletok_lambda.user u on u.id = p.user_id"+
                "inner join post_comment pc on pc.post_id=p.id and pc.user_id=u.id"+
                "where p.id = ?";
                var params = [id];

                conn.query(sql, params, function(err, result) {

                    if(err){
                        conn.end(function() {
                            response.statusCode = 400;
                            response.body = JSON.stringify({
                                "estado": "error insert",
                                "msg": err
                            });


                            callback(error, response);
                        });


                    }else{
                        conn.query("select * from jobs", function(err, result) {

                            if (err) {
                                conn.end(function() {
                                    response.statusCode = 400;
                                    response.body = JSON.stringify({
                                        "estado": "error",
                                        "msg": "POST_NOT FOUND"
                                    });


                                    callback(error, response);
                                });

                            }
                            else {
                                conn.end(function() {

                                    response.statusCode = 200;
                                    response.body = JSON.stringify({
                                        "estado": "oks",
                                        "lista": result
                                    });

                                    callback(null, response);
                                });

                            }
                        });

                    }


                });

            }
        }

    });
};