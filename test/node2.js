var str = 's999中TSTFS122中国人s121S'

var getNum = function(Str, isFilter) {
  //用来判断是否把连续的0去掉
  isFilter = isFilter || false
  if (typeof Str === 'string') {
    // var arr = Str.match(/(0\d{2,})|([1-9]\d+)/g);
    //"/[1-9]\d{1,}/g",表示匹配1到9,一位数以上的数字(不包括一位数).
    //"/\d{2,}/g",  表示匹配至少二个数字至多无穷位数字
    var arr_bak = Str.match(isFilter ? /[1-9]\d{1,}/g : /\d{2,}/g)
    var arr = Str.match(/[^\u4e00-\u9fa5|,，。；;（）()\[\]【】‘’“”]+/g)
    // var arr = Str.match( /([\d\W\S]{2,})/g);
    if (arr == null) {
      return []
    }
    return arr.map(function(item) {
      //转换为整数，
      //但是提取出来的数字，如果是连续的多个0会被改为一个0，如000---->0，
      //或者0开头的连续非零数字，比如015，会被改为15，这是一个坑
      // return parseInt(item);
      //字符串，连续的多个0也会存在，不会被去掉
      return item
    })
  } else {
    return []
  }
}
// console.log(getNum(str));//默认不加1，即不会把提取出来的0去掉

var fs = require('fs')
const readline = require('readline')

const r1 = readline.createInterface({
  input: fs.createReadStream('test/test.txt')
})
var strOutputFileName = 'test/output.txt'
var fWrite = fs.createWriteStream(strOutputFileName)

let arr = []
var i = 1 //txt中的行数
r1.on('line', function(line) { //事件监听

  let dom = getNum(line)
  dom = dom.filter(item => {
    return item.length > 2
  })
  // console.log(dom.join(' '))
  // if (i <3) {
    fWrite.write(dom.join(' ') + '\n')
  // }

  i += 1

})



















request({
  url:'http://ahaha.com?ty=111'
}).then(res=>{
  if (res.code==0){
    console.log(111)
  }else {
    console.log('else')
  }
}).then(res=>{
  console.log(222)
}).then(res=>{
  console.log(333)
})







