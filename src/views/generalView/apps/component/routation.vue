<template>
  <el-tabs class="routation" v-model="activeName">
    <el-tab-pane v-for="(data,datakey) in Top" :label="data.title" :name="'top'+datakey">
      <div class="main-group" style="width:100%;height:330px;overflow-x:hidden;overflow-y: auto;margin-bottom: 20px">
        <div style="width:100%;height:100%;" class="errdiv" v-show="err"></div>
        <div class="items-box-group" v-show="!err">
          <ul class="items-group">
            <li class="item-group item-group-li" v-for="(item,key) in data.data">
              <div class="img">{{key+1}}</div>
              <div class="item-data">
                <div class="title">
                  {{item.name}}<span>{{data.title}} · NO.{{key+1}}</span>
                </div>
                <div class="item-price">
                  <div v-for="tdData in item.arr">
                    {{tdData.value}}{{tdData.util}}
                    <p>{{tdData.itemTitle}}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import { request } from '@/network'

  export default {
    name: 'routation',
    data(){
      return{
        activeName:'top0',
        err:true,
        Top1:[
          {
            title: '用户访问次数TOP5',
            text: '我是释义文字',
            data: [
              {
                id: 1,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165646354635452121231231231321321321231245646546512120123115465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 2,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 3,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 4,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 5,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              }
            ]
          },
          {
            title: '用户访问次数TOP5',
            text: '我是释义文字',
            data: [
              {
                id: 1,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 2,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 3,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 4,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              },
              {
                id: 5,
                img: './file/app.png',
                name: '张云雷',
                arr: [
                  {itemTitle: '访问次数', value: 12165465, util: '次'},
                  {itemTitle: '日均授权用时', value: 6.8, util: '时'},
                  {itemTitle: '日均有效工时', value: 5.2, util: '时'},
                ],
              }
            ]
          },
        ],
        Top:[{
          title: '无数据',
          text: '',
          data: [
            {
              id: 1,
              img: './file/app.png',
              name: '无数据',
              arr: [],
            }
          ]
        }]
      }
    },
    methods:{
      init(){

      },
      renderFun(searchInfo){
        request({
          url: '/Ashx/ISystemOverview.ashx',
          params: {
            ty: 'GetSoftView_Soft_Top_Vue',
            StartDate: searchInfo.StartDate,
            EndDate: searchInfo.EndDate,
            ComId: searchInfo.ComId.join(','),
            ComFamId: searchInfo.ComFamId.join(','),
            BaokouAllChildComId: searchInfo.BaokouAllChildComId,
            Is_Need_Count: searchInfo.Is_Need_Count
          }
        }).then(res => {
          if (res.returncode == 0) {
            this.err=false;
            this.Top=res.returndata;
          }else {
            this.err=true;
            this.Top=[{
              title: '错误信息',
              text: '',
              data: [
                {
                  id: 1,
                  img: './file/app.png',
                  name: '无数据',
                  arr: [],
                }
              ]
            }]
            console.log(document.getElementsByClassName('errdiv')[0])
            this.$current.errDataView(document.getElementsByClassName('errdiv')[0],res.returnmsg)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .routation ul{
    list-style:none;
    margin: 0!important;
    padding: 0!important;
  }
  .main-group{
    width:100%;
    /*margin:80px auto;*/
  }

  .item-group-li{
    padding-top:10px!important;
    border-bottom: #f3f3f3 1px solid!important;
  }
  .item-group-li:hover{
    background: rgb(246, 246, 255)!important;
  }
  .items-box-group .items-group .item-group .img {
    width: 10%;
    text-align: center;
    background: url('./../assets/img/sort.png') no-repeat;
    background-size: 30px 30px;
    background-position: 50% 50%;
    height: 40px;
    line-height: 45px;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }

  .items-box-group .items-group .item-group{
    display: flex;
    width:100%;
    align-items:center;
    background: #fff;
    margin-top:0px;
    padding:0px 0;
  }
  .items-box-group .items-group .item-group .img{
    width:10%;
    text-align: center;
    /*background: url(../imgs/sort.png) no-repeat;*/
    background-size: 30px 30px;
    background-position: 50% 50%;
    height:40px;
    line-height: 45px;
    color: #fff;
    font-weight: bold;
    font-size: 14px
  }
  .items-box-group .items-group .item-group .item-data{
    width:90%;
  }

  .item-data .title{
    font-size: 16px;
    font-weight: bold;
  }
  .item-data .title span{
    color: #9e9e9e;
    margin-left:10px;
  }
  .item-price{
    width:100%;
    display: flex;
    margin-top:10px;
  }
  .item-price div{
    flex-grow: 1;
    font-size: 18px;
    font-weight: bold;
    color: var(--box-color-blue);
  }
  .item-price div span{
    font-size: 16px
  }
  .item-price div p{
    font-size: 12px;
    color: #9e9e9e;
    font-weight: 400;
  }
</style>
