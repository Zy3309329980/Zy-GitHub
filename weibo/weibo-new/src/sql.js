// const pool = mysql.createPool({
//   host     :  '127.0.0.1',
//   user     :  'root',
//   password :  '1233210',
//   database :  'weibi'
// })

// // 接收一个sql语句 以及所需的values
// // 这里接收第二参数values的原因是可以使用mysql的占位符 '?'
// // 比如 query(`select * from my_database where id = ?`, [1])

// let query = function( sql, values ) {
//   // 返回一个 Promise
//     return new Promise(( resolve, reject ) => {
//         pool.getConnection(function(err, connection) {
//             connection.query(sql, values, ( err, rows) => {
//                 resolve( rows )
//             })
//         })
//     })
// }

// module.exports = {
//     query
// } 


var mysql = require('mysql');
const bic2 = () => {
    var connection = mysql.createConnection({ 
        host            : '127.0.0.1',
        user            : 'root',
        password        : '1233210',
        database        : 'weibi' ,       
        port: '3306'
    });
    return new Promise(( resolve, reject ) => {
        let sql2 = 'SELECT * FROM data;'
        connection.connect();
        connection.query(sql2,function (err, result) {
            resolve( result )
        });
        connection.end();
    })
}

const sq = async() => {
    let cc = await bic2()
}
sq()