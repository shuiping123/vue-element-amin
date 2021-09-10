import { JSEncrypt } from 'jsencrypt'
import context from '@/main'
import XLSX from 'xlsx'


// 退出登录
async function toLoginOut() {
  await context.$store.dispatch('user/logout')
  context.$store.commit('CHANGE_LOG_STATE','logout')
  context.$router.push(`/login?redirect=${context.$route.fullPath}`)
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

export default {
  toLoginOut,
  setEncrypt,
  errDataView,
  exportExcel,
  tagTab,
  colorRgba
}
