const express = require('express'),
app = express(),
cheerio = require('cheerio'),
mysql = require('mysql'),
axios = require('axios'),
childProcess = require('child_process')

const worker = childProcess.fork('./worker.js')

const ss = ['3948352701','5208966720','2589432731','3917225829','3231047610','1005570772','2448184413','5667617555','1785533160','5672166950','5668213132','5357670210','5625133989','5178549320','3054615393','5973233937','5973637065','6003809445','1988127344','6017601357','6359395544','5972859195','5664785772','5305147245','6030122701','6026399343','2960359192','3280880197','2295650225','6017599835','5971792547','5669689463','5669328912','2253203771','6359373279','6031302315','5719743142','6039760659','1822890914','6030402215','6030660675','2782636765','6039367340','6361527487','6356947724'];
const ar = []
const getdata = async() => {
    for(let i = 0; i < ss.length; i++) {
        let data = await httpreq(ss[i])
    }
}


const httpreq = async(msg) => {
    try {
        let {data} = await axios({
            method: 'post',
            url: 'https://weibo.cn/u/' + msg,
        });
        $ = cheerio.load(data);
        let c = $('.tip2')[0].children[4].children[0].data.slice(3)
        let d = $('.tip2')[0].children[0].children[0].data.slice(3)
        ar.push({
            name: $('.ctt')[0].children[0].data,
            weibo: d.substr(0,d.length-1),
            fan: c.substr(0,c.length-1)
        })
    }catch(err) {
        console.log(err)
    }
}

getdata()
