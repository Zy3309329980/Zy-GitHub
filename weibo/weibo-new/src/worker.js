var q = ''

const httpreq = async(msg) => {
    try {
        let {data} = await axios({
            method: 'post',
            url: 'https://weibo.cn/u/' + msg,
        });
        $ = cheerio.load(data);
        let c = $('.tip2')[0].children[4].children[0].data.slice(3)
        let d = $('.tip2')[0].children[0].children[0].data.slice(3)
        q = '1'
        // ar.push({
        //     name: $('.ctt')[0].children[0].data,
        //     weibo: d.substr(0,d.length-1),
        //     fan: c.substr(0,c.length-1)
        // })
    }catch(err) {
        
    }
}
// console.log(process.argv[2])
const data = async() => {
    let cc = await httpreq(process.argv[2]);
    console.log(cc)
}
// process.send(data)

// console.log(q)