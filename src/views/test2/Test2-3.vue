
<template>
  <div>
    <tree-select :data="data"
                 :check-strictly="guanlian"
                 :defaultProps="defaultProps" multiple
                 :nodeKey="nodeKey" :checkedKeys="defaultCheckedKeys"
                 @popoverHide="popoverHide"></tree-select>
  </div>
</template>

<script>
  import TreeSelect from '@/components/SelectDown/SelectDown';
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
    components: { TreeSelect },
    data () {
      return {
        data: menus,
        defaultProps: {
          children: 'childrenList',
          label: 'menuName'
        },
        guanlian:true,
        nodeKey: 'menuId',
        defaultCheckedKeys: []
      };
    },
    created () {
      // 注意：初始化defaultCheckedKeys时，在created里面
      // 父组件先执行自己的created，然后子组件开始执行自己的created和mounted，最后父组件再执行自己的mounted。
      // 因为此页面加载，先执行该组件自己的created，然后执行TreeSelect组件的created和mounted，最后执行该组件的mounted
      this.defaultCheckedKeys = [1000];
    },
    mounted () {
      // 此处初始化defaultCheckedKeys，没效果
      this.defaultCheckedKeys = [1001];
    },
    methods: {
      popoverHide (checkedIds, checkedData,checkedType) {
        // console.log(checkedIds);
        // console.log(checkedData);
        // console.log(checkedType);
      }
    }
  };
</script>

<style scoped>

</style>
