<template>
  <div id="id" class="className">
    <div style="margin-top: 10px">
      验证结果：
      <el-button @click="exportExcel()" style="border-width:1px; width:100px">下载</el-button>
      <el-card>
        <el-scrollbar style="height:100%;width: 100%"> <!-- 滚动条 -->
          <el-row  style="height: 500px;width: 862px;"><!--可显示区域-->
            <el-table
              :data="tables.filter(data => handleAdd)"
              border
              id="out-table"
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              >
              <el-table-column label="序号" width="80px" type="index">
              </el-table-column>
              <template v-for='(col) in tableData'>
                <el-table-column
                  sortable
                  :show-overflow-tooltip="true"
                  :prop="col.dataItem"
                  :label="col.dataName"
                  :key="col.dataItem"
                  width="175px">
                </el-table-column>
              </template>
              <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" class="del-com" @click="handleDelete(scope.$index,scope.row)" >删除<i class="iconfont icon-shanchu"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  props: {
    result: {
    },
    basicValue: {
      type: String
    },
    addMark: {
      type: Boolean
    }
  },
  data() {
    return {
      tables: [],
      tableData: [{
        dataItem: '因子',
        dataName: '因子'
      }, {
        dataItem: 'IC_mean',
        dataName: 'IC_mean'
      }, {
        dataItem: 'IC_IR',
        dataName: 'IC_IR'
      }, {
        dataItem: '结果',
        dataName: '结果'
      // }, {
      //   dataItem: '详情',
      //   dataName: '详情'
      }]
    }
  },
  watch: {
    addMark(val, oldVal) {
      this.handleAdd()
    } },
  methods: {
    handleAdd() {
      var basic = parseFloat(this.basicValue)
      for (var i = 0; i < this.result.name.length; i++) {
        var isValid = ''
        if (this.result.value[i][0] >= basic || this.result.value[i][0] <= -basic) {
          isValid = '有效'
        } else {
          isValid = '无效'
        }
        var row = {
          因子: this.result.name[i],
          IC_mean: this.result.value[i][0],
          IC_IR: this.result.value[i][1],
          结果: isValid
        }
        this.tables.push(row)
      }
    },
    handleDelete(index, row) {
      this.tables.splice(index, 1)
    },
    exportExcel() {
      console.log('导出表格')
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xls')
      } catch (e) {
        if (typeof console !== 'undefined'){
          console.log(e, wbout)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

