const express = require('express'),
app = express(),
$ = require('najax'),
cheerio = require('cheerio'),
mysql  = require('mysql');  

var c = null
app.use('/', express.static(__dirname + '/'))

var ss = ['3948352701','5208966720','2589432731','3917225829','3231047610','1005570772','2448184413','5667617555','1785533160','5672166950','5668213132','5357670210','5625133989','5178549320','3054615393','5973233937','5973637065','6003809445','1988127344','6017601357','6359395544','5972859195','5664785772','5305147245','6030122701','6026399343','2960359192','3280880197','2295650225','6017599835','5971792547','5669689463','5669328912','2253203771','6359373279','6031302315','5719743142','6039760659','1822890914','6030402215','6030660675','2782636765','6039367340','6361527487','6356947724'
];
const arr = () => {
    for (var i = 0; i < ss.length; i++) {
        $.post('https://weibo.cn/u/'+ss[i], (data) => {
            $1 = cheerio.load(data);
            var name = $1('.ctt')[0].children[0].data
            var ss = data.substring(data.indexOf('>粉丝[')+4 , data.indexOf(']</a>&nbsp;<a href="/at'));
            var ss2 = data.substring(data.indexOf('<span class="tc">微博[')+20 , data.indexOf(']</span>&nbsp;<a href="/'));
            bic(name, ss, ss2)
        })
    }
}

const bic = (name, ss, ss2) => {
    var connection = mysql.createConnection({     
        host: '127.0.0.1',       
        user: 'root',              
        password: '1233210',       
        port: '3306',                   
        database: 'weibi',
    }); 
    // var sql = 'INSERT INTO data (name, fan, weiboid) VALUES ("'+name+'","'+ss+'","'+ss2+'");';
    var sql2 = 'UPDATE data SET fan="'+ss+'" WHERE name="'+name+'";'
    connection.connect();
    connection.query(sql2,function (err, result) {
    });
    connection.end();
}

const bic2 = (callback) => {
    var connection = mysql.createConnection({     
        host: '127.0.0.1',       
        user: 'root',              
        password: '1233210',       
        port: '3306',                   
        database: 'weibi',
    });
    let sql2 = 'SELECT * FROM data;'
    connection.connect();
    connection.query(sql2,function (err, result) {
        callback(result);
    });
    connection.end();
}

const getnowfans = async(callback) => {
    arr()
    bic2((msg)=>{
        if (c === null) {
            c = msg;
            callback(c, msg)
        } else {
            callback(c, msg)
        }
    })   
}

app.get('/getfans', (req, res) => {
    getnowfans((a, b) => {
        res.send({
            a: a,
            b: b
        })
        c = b;
    })
})

const server = app.listen(2080, function () {
    console.log('Example app listening at http://http://localhost/2080');
});