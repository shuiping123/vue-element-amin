<!--
    /**
     * 下拉选择树形组件，下拉框展示树形结构，提供选择某节点功能，方便其他模块调用
     * @author ljn
     * @date 2019-02-23
     * 调用示例：
     * <tree-select :height="400" // 下拉框中树形高度
     *              :width="200" // 下拉框中树形宽度
     *              :data="data" // 树结构的数据
     *              :defaultProps="defaultProps" // 树结构的props
     *              multiple   // 多选
     *              checkStrictly // 多选时，严格遵循父子不互相关联
     *              :nodeKey="nodeKey"   // 绑定nodeKey，默认绑定'id'
     *              :checkedKeys="defaultCheckedKeys"  // 传递默认选中的节点key组成的数组
     *              @popoverHide="popoverHide"> // 事件有两个参数：第一个是所有选中的节点ID，第二个是所有选中的节点数据
     *              </tree-select>
     */
-->
<template>
  <div class="searchItem">
<!--    <div class="mask" v-show="isShowSelect" @click="isShowSelect = !isShowSelect"></div>-->
<!--    <el-popover placement="bottom-start" :width="width+100" trigger="manual"-->
<!--                v-model="isShowSelect" @hide="popoverHide">-->
<!--      <el-tree class="common-tree" :style="style" ref="tree" :data="data" :props="defaultProps"-->
<!--               :show-checkbox="multiple"-->
<!--               :node-key="nodeKey"-->
<!--               :check-strictly="checkStrictly"-->
<!--               default-expand-all-->
<!--               :check-on-click-node="multiple?false:true"-->
<!--               :expand-on-click-node="false"-->
<!--               :default-checked-keys="defaultCheckedKeys"-->
<!--               :highlight-current="true"-->
<!--               @node-click="handleNodeClick"-->
<!--               @check="handleCheck"-->
<!--               @check-change="handleCheckChange"></el-tree>-->
<!--      <el-select :style="selectStyle" slot="reference" ref="select"-->
<!--                 v-model="selectedData"-->
<!--                 :multiple="multiple"-->
<!--                 :collapse-tags="true"-->
<!--                 :placeholder="placeholder"-->
<!--                 @click.native="isShowSelect = !isShowSelect"-->
<!--                 class="tree-select">-->
<!--        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
<!--      </el-select>-->
<!--    </el-popover>-->

    <el-popover
      placement="bottom-start"
      :width="width+100"
      trigger="focus">
      <el-tree class="common-tree" :style="style" ref="tree" :data="compData" :props="defaultProps"
               :show-checkbox="multiple"
               :node-key="nodeKey"
               :check-strictly="checkStrictly"
               default-expand-all
               :check-on-click-node="multiple?false:true"
               :expand-on-click-node="false"
               :default-checked-keys="defaultCheckedKeys"
               :highlight-current="true"
               @node-click="handleNodeClick"
               @check="handleCheck"
               @check-change="handleCheckChange"></el-tree>
      <el-input slot="reference"
                prefix-icon="el-icon-search"
                :style="{width: width}"
                :placeholder="placeholder"
                ref="select"
                @keyup.enter.native="searchSelect"
                v-model.lazy.trim="selectedData"></el-input>
    </el-popover>


  </div>
</template>

<script>

  export default {
    name: 'tree-select',
    props: {
      // 树结构数据
      data: {
        type: Array,
        default() {
          return []
        }
      },
      placeholder: {
        type: String,
        default() {
          return '请选择'
        }
      },
      defaultProps: {
        type: Object,
        default() {
          return {
            children: 'childrenList',
            label: 'menuName'
          }
        }
      },
      // 配置是否可多选
      multiple: {
        type: Boolean,
        default() {
          return false
        }
      },
      nodeKey: {
        type: String,
        default() {
          return 'menuId'
        }
      },
      // 显示复选框情况下，是否严格遵循父子不互相关联
      checkStrictly: {
        type: Boolean,
        default() {
          return false//默认不关联 true:不关联  false:关联
        }
      },
      // 默认选中的节点key数组
      checkedKeys: {
        type: Array,
        default() {
          return []
        }
      },
      width: {
        type: Number,
        default() {
          return 200
        }
      },
      height: {
        type: Number,
        default() {
          return 300
        }
      },
      checkData: {}
    },
    data() {
      return {
        compData:[],
        defaultCheckedKeys: [],
        isShowSelect: false, // 是否显示树状选择器
        options: [],
        selectedData: '', // 选中的节点
        style: 'width:' + (this.width - 20 + 100) + 'px;' + 'height:' + this.height + 'px;',
        selectStyle: 'width:' + (this.width - 5) + 'px;',
        checkedIds: [],
        checkedData: [],
        checkedType: [],
        value: []
      }
    },
    mounted() {
      // this.defaultCheckedKeys = []
      // this.selectedData = []
      // this.value = []
      this.compData=this.data;
      if (this.checkedKeys.length > 0) {
        if (this.multiple) {
          this.defaultCheckedKeys = this.checkedKeys
          this.selectedData = this.checkedKeys.map((item) => {
            var node = this.$refs.tree.getNode(item)
            return node.label
          }).join(',')
          this.value = this.checkedKeys

        } else {
          var item = this.checkedKeys[0]
          this.$refs.tree.setCurrentKey(item)
          var node = this.$refs.tree.getNode(item)
          this.selectedData = node.label
          this.value = this.checkedKeys
        }
      }
      // this.$emit('changeCheck')
    },
    methods: {
      popoverHide() {
        if (this.multiple) {
          this.checkedIds = this.$refs.tree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
          this.checkedData = this.$refs.tree.getCheckedNodes() // 所有被选中的节点所组成的数组数据
          this.checkedType = this.$refs.tree.getCheckedNodes() // 所有被选中的节点所组成的数组数据
        } else {
          this.checkedIds = this.$refs.tree.getCurrentKey()
          this.checkedData = this.$refs.tree.getCurrentNode()
        }
        this.$emit('popoverHide', this.checkedIds, this.checkedData, this.checkedType)
      },
      // 节点被点击时的回调,返回被点击的节点数据
      handleNodeClick(data, node) {
        if (!this.multiple) {
          let tmpMap = {}
          tmpMap.value = node.key
          tmpMap.label = node.label
          this.options = []
          this.options.push(tmpMap)
          this.selectedData = node.label
          this.isShowSelect = !this.isShowSelect
          this.value = [node.key]
          this.$emit('changeCheck')
        }

      },
      handleCheckChange() {
      },
      // 节点选中状态发生变化时的回调
      handleCheck() {
        if (this.multiple) {
          let optionArr = [];
          let selectDataArr=[];
          let keyArr = this.$refs.tree.getCheckedNodes(true).map(item => {
            let tmpMap = {}
            tmpMap.value = item.menuId
            tmpMap.label = item.menuName
            optionArr.push(tmpMap);
            selectDataArr.push(item.menuName);
            return item.menuId
          })
          this.options=optionArr;
          this.selectedData = selectDataArr.join(',')
          this.value = keyArr
          setTimeout(()=>this.$emit('changeCheck'),200)
        }
      },
      setCheckNodes(keys) {
        if (this.multiple) {
          this.$refs.tree.setCheckedKeys(keys)
          setTimeout(() => {
            this.selectedData=this.$refs.tree.getCheckedNodes(false,false).map(item=>{
              return item.menuName;
            }).join(',')
          }, 200)
        } else {
          setTimeout(() => {
            this.$refs.tree.setCheckedKeys(keys)
            if (keys.length > 0) {
              this.selectedData = this.$refs.tree.getNode(keys[0]).label
            } else {
              this.selectedData = ''
            }
          }, 200)
        }
      },
      searchSelect(){
        if (this.multiple){
          var  arr={
            menuId:this.data[0].menuId,
            menuName:this.data[0].menuName,
          };
          let checkedArr=[];//记录之前默认选中的信息
          arr.childrenList=this.data[0].childrenList.filter(item=>{
            if (this.$refs.tree.getCheckedKeys(true).indexOf(item.menuId)!==-1)checkedArr.push(item.menuId);
            return item.menuName.indexOf(this.selectedData)!==-1||this.$refs.tree.getCheckedKeys(true).indexOf(item.menuId)!==-1
          })
          this.compData=[arr];
          setTimeout(()=>{
            this.$refs.tree.setCheckedKeys(checkedArr)
          },200)
        }else {
          this.compData=this.data.filter(item=>{
            return item.menuName.indexOf(this.selectedData)!==-1
          })
        }

      }
    },
    watch: {
      isShowSelect(val) {
        // 隐藏select自带的下拉框
        // this.$refs.select.blur()
      },
      value(newVal) {
        this.$emit('update:checkData', newVal)
      },
      data(newVal){
        this.compData=newVal
      },
    }
  }
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .common-tree {
    overflow: auto;
  }
</style>

<style>
  .tree-select .el-select__tags .el-tag .el-tag__close {
    display: none;
  }

  .tree-select .el-select__tags .el-tag .el-icon-close {
    display: none;
  }
</style>
