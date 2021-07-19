
<template>
  <div>
    <tree-select :data="data"
                 ref="coms"
                 :check-strictly="true"
                  :checkedKeys="defaultCheckedKeys"></tree-select>
<!--    <select-down-normal :data="data"-->
<!--                 :check-strictly="false"-->
<!--                  multiple-->
<!--                 :checkedKeys="defaultCheckedKeys"></select-down-normal>-->

    <button type="button" @click="getValue">获取id</button>
    <p>{{value}}</p>
<!--    <p>{{value2}}</p>-->
  </div>
</template>

<script>
  import TreeSelect from '@/components/SelectDown/SelectDown';
  import SelectDownNormal from '@/components/SelectDown/SelectDownNormal';
  var menus = [
    {
      'menuId': 1,
      'menuName': '系统管理',
      'childrenList': [
        {
          'menuId': 100,
          'menuName': '用户管理',
          'childrenList': [
            {
              'menuId': 1000,
              'menuName': '用户查询'
            },
            {
              'menuId': 1001,
              'menuName': '用户新增'
            },
            {
              'menuId': 1002,
              'menuName': '用户修改'
            },
            {
              'menuId': 1003,
              'menuName': '用户删除'
            },
            {
              'menuId': 1004,
              'menuName': '用户删除1'
            },
            {
              'menuId': 1005,
              'menuName': '用户删除2'
            },
            {
              'menuId': 1009,
              'menuName': '用户删除3'
            },
            {
              'menuId': 10010,
              'menuName': '用户删除4'
            }
          ]
        },
        {
          'menuId': 101,
          'menuName': '角色管理',
          'childrenList': [
            {
              'menuId': 1006,
              'menuName': '角色查询'
            },
            {
              'menuId': 1007,
              'menuName': '角色新增'
            },
            {
              'menuId': 1008,
              'menuName': '角色修改'
            },
            {
              'menuId': 1011,
              'menuName': '删除角色'
            }
          ]
        }
      ]
    }
  ];
  export default {
    name: 'home',
    components: { TreeSelect ,SelectDownNormal},
    data () {
      return {
        data: menus,
        defaultCheckedKeys: [1],//默认选中的id，如果需要修改，在created里面修改
        value:[],
        value2:[],
      };
    },
    methods: {
      getValue(){
        this.value=this.$refs.coms.value;
        // this.value2=this.$refs.apps.value;
      },
    }
  };
</script>

<style scoped>

</style>
