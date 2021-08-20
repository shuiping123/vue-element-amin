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
  <div>
    <button @click="exportExcel">测试</button>
    <button @click="sheet_from_array_of_arrays2(data,10)">测试2</button>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import XLSXStyle from 'xlsx-style';

  export default {
    name: 'tree-select',
    data(){
      return {
        value2: '',
        data :[

          [ "id",    "name", "value" ],

          [    1, "sheetjs",    7262 ],

          [    2, "js-xlsx",    6969 ]

        ]
      }
    },
    methods:{
      exportExcel(){
        var _data = [

          [ "id",    "name", "value" ],

          [    1, "中文测试",    7262 ],

          [    2, "js-xlsx",    6969 ]

        ];
        // var ws = XLSX.utils.json_to_sheet([
        //   { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
        //   { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
        // ], {header:["S","h","e","e_1","t","J","S_1"]});
        const ws= XLSX.utils.aoa_to_sheet(_data);
        ws["A1"].s = {									//为某个单元格设置单独样式
          font: {
            name: '宋体',
            sz: 24,
            bold: true,
            color: { rgb: "FFFFAA00" }
          },
          alignment: { horizontal: "center", vertical: "center", wrap_text: true },
          fill: { bgcolor: { rgb: '000000' } }
        }
        // ws[v.position].s = {
        //   border:{
        //     top:{style:'thin'}, left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}
        //   }
        // }
        console.log(ws)

        /* generate workbook and add the worksheet */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, '测试内容');
        // XLSX.utils.book_append_sheet(wb, ws, '测试内容2');
        /* save to file */
        XLSX.writeFile(wb, 'SheetJS.xlsx');
      },
      sheet_from_array_of_arrays2(data, topLength, opts) {
        let ws = {};
        let range = {
          s: {
            c: 10000000,
            r: 10000000
          },
          e: {
            c: 0,
            r: 0
          }
        };
        for (let R = 0; R !== data.length; ++R) {
          for (let C = 0; C !== data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            let cell = {
              v: data[R][C]
            };
            if (cell.v === null) continue;
            let cell_ref = XLSX.utils.encode_cell({
              c: C,
              r: R + topLength
            });
            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
              cell.t = 'n';
              cell.z = XLSX.SSF._table[14];
              cell.v = datenum(cell.v);
            } else cell.t = 's';

            ws[cell_ref] = cell;
          }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
      }
    }
  }
</script>

<style>

</style>
