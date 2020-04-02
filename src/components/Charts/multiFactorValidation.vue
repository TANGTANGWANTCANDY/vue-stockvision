<template>
  <div :id="id" :class="className">
    <div style="margin-top: 10px">
      验证结果：
      <el-card>
        <el-scrollbar style="height:100%;width: 100%"> <!-- 滚动条 -->
          <!-- 注意需要给 el-scrollbar 设置高度，判断是否滚动是看它的height判断的 -->
          <el-row  style="height: 300px;width: 630px;"><!--可显示区域-->
            <el-table
              :data="tables.filter(data => handleAdd)"
              ref="multipleTable"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change='selectArInfo'>
              <el-table-column label="序号" width="62px" type="index">
              </el-table-column>
              <template v-for='(col) in tableData'>
                <el-table-column
                  sortable
                  :show-overflow-tooltip="true"
                  :prop="col.dataItem"
                  :label="col.dataName"
                  :key="col.dataItem"
                  width="160px">
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
export default {
  props: {
    factorList: {
      type: Array
    },
    result: {
      type: Array
    },
    addMark: {
      type: Boolean
    }
  },
  data() {
    return {
      tables: [],
      tableData: [{
        dataItem: '因子组合',
        dataName: '因子组合'
      }, {
        dataItem: 'IC_mean',
        dataName: 'IC_mean'
      }, {
        dataItem: 'IC_IR',
        dataName: 'IC_IR'
      }]
    }
  },
  watch: {
    addMark(val, oldVal) {
      this.handleAdd()
    } },
  methods: {
    handleAdd() {
      var factorStr = this.factorList.toString()
      console.log(factorStr)
      var row = {
        因子组合: factorStr,
        IC_mean: this.result[0],
        IC_IR: this.result[1]
      }
      this.tables.push(row)
    },
    handleDelete(index, row) {
      this.tables.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>

