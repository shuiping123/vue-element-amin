import { JSEncrypt } from 'jsencrypt'
import context from '@/main'


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



export default {
  toLoginOut,
  setEncrypt,
  errDataView,
}
