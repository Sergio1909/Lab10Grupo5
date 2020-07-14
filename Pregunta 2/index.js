pregunta 2
const mysql = require('mysql2');
const querystring = require('querystring');

exports.handler = async(event) => {

    if(event.querystringParameters != null && event.querystringParameters.query != null){

        var query = event.querystringParameters.query;

        var conn = mysql.createConnection({
            host:"database-probando2.cdsncczavomz.us-east-1.rds.amazonaws.com",
            user: "admin",
            password:"dDN9oKPLDTObFmnrgtzl",
            port:3306,
            database: "teletok_lambda"
        });


        conn.connect(function(error){
            if(error){
                conn.end(function(){
                    callback(error,{
                        statusCode : 400,
                        body: JSON.stringify({
                            "estado": "error",
                            "msg":"error a la conexión a base de datos"
                        })
                    } )
                })
            }else{

                var sql = "SELECT * FROM teletok_lambda.post where description like %?% ";

                conn.query(sql, [query], function(error, result){

                    if(error){
                        conn.end(function (){
                            callback(error, {
                                statusCode: 400,
                                body
                            })
                        } )
                    }

                }  )

            }

        });


    }


}