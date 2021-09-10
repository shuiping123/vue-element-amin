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
  <div class="service-center">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.children" style="width: calc(100% - 47px)" class="two-list">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="city_name" label="城市"></el-table-column>
            <el-table-column prop="price" label="成本价"></el-table-column>
            <el-table-column prop="sale_price" label="售出价"></el-table-column>
            <el-table-column prop="discount_price" label="折扣价"></el-table-column>
            <el-table-column prop="product_online_time" label="上架时间"></el-table-column>
            <el-table-column prop="product_off_time" label="下架时间"></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column></el-table-column>
            <el-table-column prop="cat_id" label="状态"/>
            <el-table-column prop="cat_id" label="新增"/>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="product_id" label="ID"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品构成" prop="name"/>
      <el-table-column label="商品描述" prop="spu_desc"></el-table-column>
      <el-table-column label="支付方式" prop="pay_type"/>
      <el-table-column label="渠道" prop="from_type"/>
      <el-table-column label="商品类目" prop="product_type"/>
      <el-table-column label="商品标签" prop="product_sign"></el-table-column>
      <el-table-column label="状态" prop="is_online"/>
      <el-table-column label="操作" prop="pay"/>
    </el-table>
  </div>

</template>

<script>
  import XLSX from 'xlsx';
  import XLSXStyle from 'xlsx-style';

  export default {
    name: 'tree-select',
    data(){
      return {
        height:'100px',
        tableData:[]
      }
    },
    methods:{
      test(num){
        this.height=num;
      }
    }
  }
</script>

<style>
  .parent{
    width:100%;

    display:flex;
    flex-flow:column nowrap;
  }
  .a{
    height:20px;
    background:red;
  }
  .b{
    flex:1;
    background:green;
  }

</style>
