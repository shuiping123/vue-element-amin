import { JSEncrypt } from 'jsencrypt'
import context from '@/main'
import XLSX from 'xlsx'


// 退出登录
async function toLoginOut(path) {
  await context.$store.dispatch('user/logout')
  context.$store.commit('CHANGE_LOG_STATE','logout')
  if (path){
    context.$router.push(`/login?redirect=${path}`)
  }else {
    context.$router.push(`/login?redirect=${context.$route.fullPath}`)
  }
}

// 密码加密，直接返回密码值
function setEncrypt(msg) {
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC0hrRIjb3noDWNtbDpANbjt5Iwu2NFeDwU16Ec87ToqeoIm2KI+cOs81JP9aTDk/jkAlU97mN8wZkEMDr5utAZtMVht7GLX33Wx9XjqxUsDfsGkqNL8dXJklWDu9Zh80Ui2Ug+340d5dZtKtd+nv09QZqGjdnSp9PTfFDBY133QIDAQAB'

  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(msg)
}

function errDataView(domElement,errorInfo) {
  setTimeout(()=>{
    domElement.innerHTML=`<div style="align-items:center;justify-content:center;display: -webkit-flex;display: flex;width: 100%;height: 100%;color: var(--err-info-color)">
                            <i class="el-icon-warning-outline"></i>
                            <span style="font:16px Medium;">${errorInfo}</span>
                        </div>`;
  },200)
}

/**
 * 导出excel
 * @param ExcelName 导出文件名
 * @param data 数据
 *        {name:'sheet页名称',data:[
              [ "id",    "name", "value" ], 表头
              [    1, "中文测试",    7262 ],  表内容
              [    2, "js-xlsx",    6969 ]]
          }
 * */
function exportExcel(ExcelName,...data){
  const wb = XLSX.utils.book_new();
  data.map(item=>{
    let ws= XLSX.utils.aoa_to_sheet(item.data);
    XLSX.utils.book_append_sheet(wb, ws, item.name);
  })
  XLSX.writeFile(wb, ExcelName+'.xlsx');
}


/**
 * 页面跳转函数
 * @param name 路由名称，例 test2-2
 * @param params 传参名称，例{id:1}
 * */
function tagTab(name,params) {
  context.$router.push({
    name,
    params
  })
  context.$store.dispatch('tagsView/addView', context.$route)
}


/**
 * 将十六进制的颜色转成半透明色
 * @param sHex 十六进制
 * @param alpha 透明度
 * */
function colorRgba(sHex, alpha) {
// 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  /* 16进制颜色转为RGB格式 */
  var sColor = sHex.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    var sColorChange = []
    for (var i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
  }
  else {
    return sColor
  }
}

/**
 * 数组去重
 * @param arr 传入需要去重的数组
 * */
function unique(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {         //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}

/**
 * 深度合并对象  Object.assign(obj1,obj2)的升级版
 * @param obj1 需要合并其他的obj对象
 * @param obj2 需要被合并的obj对象
 * */
function deepMerge(obj1, obj2) {
  let key;
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
    obj1[key] =
      obj1[key] &&
      obj1[key].toString() === "[object Object]" &&
      (obj2[key] && obj2[key].toString() === "[object Object]")
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key]);
  }
  return obj1;
}



export default {
  toLoginOut,
  setEncrypt,
  errDataView,
  exportExcel,
  tagTab,
  colorRgba,
  unique,
  deepMerge,
}
