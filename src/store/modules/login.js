export default {
  state:{
    logState:'login',//login登录状态  logout登出状态

  },
  mutations:{
    // 修改登录状态,logState传入值支持“login”、“logout”
    CHANGE_LOG_STATE(state,logState){
      state.logState=logState;
    }
  }
}
