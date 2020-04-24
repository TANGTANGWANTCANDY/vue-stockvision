<template>
  <div>
    <div style="margin-left: 20px;margin-top: 10px;clear: both">
      <div class="select-div" style="">
        <div class="select-date" style="margin-right: 100px;float: left">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="date"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            style="width: 100%;"></el-date-picker>
        </div>
        <div class="select-market">
          <el-select v-model="curMarket" style="width: 100px" placeholder="请选择">
            <el-option
              v-for="item in markets"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="getIndexes">确认</el-button>
        </div>
        <div class="select-index">
          <el-select v-if="indexes.length>0" v-model="curIndex" style="width: 100px" placeholder="请选择">
            <el-option
              v-for="item in indexes"
              :key="item.tsCode"
              :label="item.name"
              :title="item.fullName"
              :value="item.tsCode">
            </el-option>
          </el-select>
        </div>
      </div>
      <p></p>
      <div >
        <el-button @click="refresh">刷新</el-button>
        <el-button @click="orderByCon(1)">当日个股贡献度排序</el-button>
        <el-button @click="orderByCon(5)">5日个股贡献度排序</el-button>
      </div>
    </div>

    <div style="text-align: center;background-color: #587482;margin-left: 10px;margin-right: 10px">
      <v-table
        is-horizontal-resize
        column-width-drag
        :multiple-sort="multipleSort"
        style="width:100%"
        :columns="tableConfig.columns"
        :table-data="tableConfig.tableData"
        :is-loading="isLoading"
        @sort-change="sortChange"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :paging-index="(pageIndex - 1) * pageSize"
        odd-bg-color="#78909C"
        even-bg-color="#90979c"
      ></v-table>
      <p></p>
      <v-pagination
        @page-change="pageChange"
        @page-size-change="pageSizeChange"
        :total="total"
        :page-size="pageSize"
        :layout="['total', 'prev', 'pager', 'next', 'sizer', 'jumper']"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
  import DateSelect from "./DateSelect";
  export default {
    name: "ContributionTable",
    components: {
      DateSelect: DateSelect
    },
    data() {
      return {
        date: "",
        indexes: [],
        curIndex: '',
        markets:[{value: 'MSCI', label: 'MSCI指数'}, {value: 'CSI', label: '中证指数'},{value:'SSE',label:'上交所指数'},
          {value: 'SZSE', label: '深交所指数'},{value: 'CICC', label: '中金指数'},{value: 'SW', label: '申万指数'},{value: 'OTH', label: '其他指数'}],
        curMarket:'SSE',
        rawData: [],
        pageIndex: 1,
        pageSize: 20,
        isLoading: false,
        total: 0,
        multipleSort: false,
        tableConfig: {
          tableData: [],
          columns: [
            {
              field: 'order', title: 'TOP', width: 50, titleAlign: 'center', columnAlign: 'center',
              formatter: function (rowData, index, pagingIndex) {
                var currentIndex = index + pagingIndex;
                return currentIndex < 10 ? '<span style="color:red;font-weight: bold;">' + (currentIndex + 1) + '</span>' : currentIndex + 1;
              }, isFrozen: true
            },
            {field: 'symbol', title: '股票代码', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {
              field: 'name', title: '股票名', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true,
              formatter: function (rowData, rowIndex, pagingIndex, field) {
                return '<span style="color:orange;font-weight: bold;">' + (rowData[field]) + '</span>';
              }, isFrozen: true
            },
            {
              field: 'pctChg',
              title: '涨跌幅(%)',
              width: 150,
              titleAlign: 'center',
              columnAlign: 'center',
              isResize: true,
              orderBy: 'asc',
              formatter: function (rowData, rowIndex, pagingIndex, field) {
                if (rowData[field] > 0)
                  return `<span style="color:red">${rowData[field]}</span>`;
                else if (rowData[field] < 0)
                  return `<span style="color:green">${rowData[field]}</span>`;
                else
                  return rowData[field];
              }
            },
            {
              field: 'contribution',
              title: '当日贡献度(%)',
              width: 180,
              titleAlign: 'center',
              columnAlign: 'center',
              isResize: true,
              orderBy: 'asc',
              formatter: function (rowData, rowIndex, pagingIndex, field) {
                let num = rowData[field] * Math.pow(10, 9);
                return num.toFixed(2);
              }
            },
            {
              field: 'contribution5',
              title: '5日贡献度(%)',
              width: 180,
              titleAlign: 'center',
              columnAlign: 'center',
              isResize: true,
              orderBy: 'asc',
              formatter: function (rowData, rowIndex, pagingIndex, field) {
                let num = rowData[field] * Math.pow(10, 9);
                return num.toFixed(2);
              }
            }
          ]
        }
      }
    },
    /*
    async created() {
      let myDate = new Date;
      let year = myDate.getFullYear();//获取当前年
      let month = myDate.getMonth() + 1;//获取当前月
      let day = myDate.getDate();//获取当前日
      let dateObj = {
        year: year,
        month: month,
        day: day
      };
      this.date = this.dateObjToStr(dateObj);
      await this.getRawData(this.date);
      await this.getTableData();
    },
    */
    methods: {
      refresh() {
        //使用axios的get请求向后台获取用户信息数据
        this.isLoading = true;
        this.$axios.get('/contribution/'+this.curIndex+'/'+this.date)
          .then(ret=>{
            this.isLoading = false;
            this.rawData = ret.data
            //console.log(this.rawData)
            this.total = this.rawData.length
            this.getTableData()
          })
          .catch(err=>{
            console.log(err);
            if (err.message !== 'interrupt') {
              alert('请求失败')
            }
          })
      },
      // 获取 table 组件每次操作后的参数（重新去请求数据）
      sortChange(params) {
        let orderColumn = 'pctChg';
        let orderBy = '';
        if (params.pctChg.length > 0) {
          orderBy = params.pctChg;
        } else if (params.contribution.length > 0) {
          orderColumn = 'contribution';
          orderBy = params.contribution;
        } else if (params.contribution5.length > 0) {
          orderColumn = 'contribution5';
          orderBy = params.contribution5;
        }
        console.log(orderColumn);
        console.log(orderBy);
        if (orderBy.length > 0) {
          this.tableConfig.tableData.sort(function (a, b) {
            if (orderBy === 'asc') {
              if (orderColumn === 'pctChg') {
                console.log("jsgfsjhdgfhds");
                return a.pctChg - b.pctChg;
              } else if (orderColumn === 'contribution') {
                return a.contribution - b.contribution;
              } else if (orderColumn === 'contribution5') {
                return a.contribution5 - b.contribution5;
              }
            } else if (orderBy === 'desc') {
              if (orderColumn === 'pctChg') {
                return b.pctChg - a.pctChg;
              } else if (orderColumn === 'contribution') {
                return b.contribution - a.contribution;
              } else if (orderColumn === 'contribution5') {
                return b.contribution5 - a.contribution5;
              }
            } else {
              return 0;
            }
          });
        }
      },
      //获取当前页数据
      getTableData() {
        this.tableConfig.tableData = this.rawData.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize);
      },
      pageChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getTableData();
      },
      pageSizeChange(pageSize) {
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      getIndexes(){
        this.$axios.get('/contribution/market/'+this.curMarket+'/'+this.date).then(
          ret=>{
            console.log(ret.data)
            this.indexes=ret.data
          }
        ).catch(err => {
            alert('请求失败');
          })
      },
      orderByCon(val){
        if(val==1){
          this.$axios.post('/contribution/sort1',{params:this.rawData})
            .then(ret=>{
                this.rawData=ret.data
                this.getTableData()
              })
        }
        else if(val==5){
          this.$axios.post('/contribution/sort5',{params:this.rawData})
            .then(ret=>{
              this.rawData=ret.data
              this.getTableData()
            })
        }
      },
      /*
      dateChange(obj) {
        this.date = this.dateObjToStr(obj);
      },
      dateObjToStr(obj) {
        var year = obj.year;
        var month = obj.month;
        var day = obj.day;
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        return year + "" + month + "" + day;
      }*/

    },
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #90979c;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    font-weight: bold;
    text-align: center;
    color: #49ffcc;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center {
    text-align: center;
  }
</style>
