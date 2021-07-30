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
    <div class="mask" v-show="isShowSelect" @click="isShowSelect = !isShowSelect"></div>
    <el-popover placement="bottom-start" :width="width+100" trigger="manual"
                v-model="isShowSelect" @hide="popoverHide">
      <el-tree class="common-tree" :style="style" ref="tree" :data="data" :props="defaultProps"
               :show-checkbox="multiple"
               :node-key="nodeKey"
               :check-strictly="checkStrictly"
               default-expand-all
               :expand-on-click-node="false"
               :default-checked-keys="defaultCheckedKeys"
               :highlight-current="true"
               :check-on-click-node="multiple?false:true"
               @node-click="handleNodeClick"
               @check="handleCheck"
               @check-change="handleCheckChange"></el-tree>
      <el-select :style="selectStyle" slot="reference" ref="select"
                 style="overflow: hidden"
                 v-model="selectedData"
                 :placeholder="placeholder"
                 :collapse-tags="true"
                 :multiple="multiple"
                 @click.native="isShowSelect = !isShowSelect"
                 class="tree-select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
          return true
        }
      },
      placeholder:{
        type:String,
        default(){
          return '请选择'
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
      checkData:{}
    },
    data() {
      return {
        defaultCheckedKeys: [],
        isShowSelect: false, // 是否显示树状选择器
        options: [],
        selectedData: [], // 选中的节点
        style: 'width:' + (this.width - 20+100) + 'px;' + 'height:' + this.height + 'px;',
        selectStyle: 'width:' + (this.width-5) + 'px;',
        checkedIds: [],
        checkedData: [],
        checkedType: [],
        value: []//存储真实的Id,在父组件可以通过refs获取，例如给子组件添加ref='hello',在父组件使用this.$refs.hello.value获取选中的id
      }
    },
    mounted() {
      this.defaultCheckedKeys = [];
      this.selectedData = [];
      // this.value = [];
      if (this.checkedKeys.length > 0) {
        if (this.multiple) {
          let arr = [];
          this.checkedKeys.map(item => {
            var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
            arr.push(node.key);
            (function treeChild(children) {
              if (children.childNodes.length !== 0) {
                children.childNodes.map(child => {
                  arr.push(child.key);
                  if (child.childNodes.length !== 0) {
                    treeChild(child)
                  }
                })
              }
            }(node))
          })
          this.defaultCheckedKeys = arr;

          this.selectedData = this.checkedKeys.map((item) => {
            var node = this.$refs.tree.getNode(item)
            return node.label
          });
          this.value = this.checkedKeys;
        } else {
          var item = this.checkedKeys[0]
          this.$refs.tree.setCurrentKey(item)
          var node = this.$refs.tree.getNode(item)
          this.selectedData = node.label;
          this.value = this.checkedKeys;
        }
      }
      this.$emit('changeCheck')
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
          this.isShowSelect = !this.isShowSelect;
          this.value = this.options.map(item => {
            return item.value;
          });
          setTimeout(()=>this.$emit('changeCheck'),200)
        }
      },
      handleCheckChange() {
        // console.log('check')
      },
      // 节点选中状态发生变化时的回调
      handleCheck(nowData, nowCheck) {
        if (this.multiple){
          // nowData 当前点击的节点
          // nowType 当前点击的节点改变后的状态
          let Tree = this.$refs.tree
          let nowType = this.$refs.tree.getNode(nowData).checked;
          var Parent = Tree.getNode(nowData).parent;//父节点
          var ChildArr = Tree.getNode(nowData).childNodes;//子节点的集合
          // 有子节点,now=>父节点
          if (ChildArr.length !== 0) {
            if (!nowType) {
              var checkedKeys = Tree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
              checkedKeys = checkedKeys.filter(item => {
                let state = 0;
                (function xunhuan(parent) {
                  if (parent.childrenList !== undefined) {
                    parent.childrenList.map(child => {
                      if (child.childrenList !== undefined) {
                        child.menuId == item ? state = 1 : null
                        xunhuan(child)
                      } else {
                        child.menuId == item ? state = 1 : null
                      }
                    })
                  }
                })(nowData)
                return state != 1
              })
              this.$refs.tree.setCheckedKeys(checkedKeys)
              this.options = []
              checkedKeys.map((item) => {
                var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                let tmpMap = {}
                tmpMap.value = node.key
                tmpMap.label = node.label
                return tmpMap

              })

            } else {
              var checkedKeys = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据

              (function xunhuan(item) {
                item.map((child) => {
                  if (child.childrenList !== undefined) {
                    checkedKeys.push(child.menuId)
                    xunhuan(child.childrenList)
                  } else {
                    checkedKeys.push(child.menuId)
                  }
                })
              }(nowData.childrenList))

              this.$refs.tree.setCheckedKeys(checkedKeys)
              this.options = checkedKeys.map((item) => {
                var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                let tmpMap = {}
                tmpMap.value = node.key
                tmpMap.label = node.label
                return tmpMap

              })

            }
          }
          // 没有子节点,now=>子节点
          if (Tree.getNode(nowData).parent.parent) {
            if (!nowType) {
              // console.log(checkedKeys);
              // checkedKeys = checkedKeys.filter(item => {
              //   return parent.key != item
              // })
              function cancleP(node, checks) {
                checks = checks.filter(item => {
                  return node.parent.key != item
                })
                if (node.parent.parent) {
                  cancleP(node.parent, checks)
                } else {
                  checks = checks.filter(item => {
                    return node.parent.key != item
                  })
                  checkedKeys=checks
                }
              }
              cancleP(Tree.getNode(nowData), this.$refs.tree.getCheckedKeys());
              this.$refs.tree.setCheckedKeys(checkedKeys)
              this.options = checkedKeys.map((item) => {
                var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                let tmpMap = {}
                tmpMap.value = node.key
                tmpMap.label = node.label
                return tmpMap
              })


            }
          }
          var checkedKeys = this.$refs.tree.getCheckedKeys() // 所有被选中的节点的 key 所组成的数组数据
          this.options = checkedKeys.map((item) => {
            var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
            let tmpMap = {}
            tmpMap.value = node.key
            tmpMap.label = node.label
            return tmpMap

          })
          let arr = this.options.filter(item => {
            let nowP = Tree.getNode(item.value).parent;
            if (nowP.checked) {
              return false;
            } else {
              return true;
            }
          });
          this.selectedData = arr.map(item => {
            return item.label;
          });
          this.value = arr.map(item => {
            return item.value;
          })
          setTimeout(()=>this.$emit('changeCheck'),200)
        }
      },
      setCheckNodes(keys){
        if (this.multiple){
         setTimeout(()=>{
           if (keys.length > 0) {
             let Tree = this.$refs.tree
             keys.map(item => {
               var ChildArr = Tree.getNode(item).childNodes//子节点的集合
               // 有子节点,now=>父节点
               if (ChildArr.length !== 0) {
                 var checkedKeys = this.$refs.tree.getCheckedKeys(); // 所有被选中的节点的 key 所组成的数组数据

                 (function xunhuan(item) {
                   item.map((child) => {
                     if (child.childNodes.length !== 0) {
                       checkedKeys.push(child.key)
                       xunhuan(child.childNodes)
                     } else {
                       checkedKeys.push(child.key)
                     }
                   })
                 }(ChildArr))

                 checkedKeys.push(item)
                 this.$refs.tree.setCheckedKeys(checkedKeys)

                 this.options = checkedKeys.map((item) => {
                   var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                   let tmpMap = {}
                   tmpMap.value = node.key
                   tmpMap.label = node.label
                   return tmpMap
                 })
                 this.selectedData = keys.map((item) => {
                   var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                   return node.label
                 })

               }else{
                 this.$refs.tree.setCheckedKeys(keys)
                 this.options = keys.map(item => {
                   var node = this.$refs.tree.getNode(item) // 所有被选中的节点对应的node
                   let tmpMap = {}
                   tmpMap.value = node.key
                   tmpMap.label = node.label
                   return tmpMap
                 })
                 this.selectedData = this.options.map((item) => {
                   return item.label
                 })
               }
             })

           }else {
             this.$refs.tree.setCheckedKeys(keys)
             this.selectedData=[];
           }
         },200)
       }else {
         setTimeout(()=>{
           this.$refs.tree.setCheckedKeys(keys)
           this.selectedData=[];
         },200)
       }
      }
    },
    watch: {
      isShowSelect(val) {
        // 隐藏select自带的下拉框
        this.$refs.select.blur()
      },
      value(newVal){
        this.$emit('update:checkData',newVal)
      }
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
