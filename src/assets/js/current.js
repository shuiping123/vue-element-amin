import { JSEncrypt } from 'jsencrypt'

// 退出登录
async function toLoginOut(nowThis) {
  await nowThis.$store.dispatch('user/logout')
  nowThis.$router.push(`/login?redirect=${nowThis.$route.fullPath}`)
}

// 密码加密，直接返回密码值
function setEncrypt(msg) {
  const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCC0hrRIjb3noDWNtbDpANbjt5Iwu2NFeDwU16Ec87ToqeoIm2KI+cOs81JP9aTDk/jkAlU97mN8wZkEMDr5utAZtMVht7GLX33Wx9XjqxUsDfsGkqNL8dXJklWDu9Zh80Ui2Ug+340d5dZtKtd+nv09QZqGjdnSp9PTfFDBY133QIDAQAB'

  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(msg)
}

export default {
  toLoginOut,
  setEncrypt
}
