<template>
  <div>
    <div style="min-height: 100px;" >
      <DateSelect @dateSelectChange="dateChange"></DateSelect>
      <p></p>
      <el-button @click="refresh">刷新</el-button>
    </div>

    <div >
      <v-table
        is-horizontal-resize
        column-width-drag
        multiple-sort
        :is-loading="isLoading"
        style="width:100%"
        :columns="tableConfig.columns"
        :table-data="tableConfig.tableData"
        @sort-change="sortChange"
        row-hover-color="#eee"
        row-click-color="#edf7ff"
        :paging-index="(pageIndex-1)*pageSize"
      ></v-table>
      <div class="table_pagination_partition" style="height: 10px">  </div>
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
        date:"",
        rawData:[],
        pageIndex:1,
        pageSize:20,
        isLoading:false,
        total:0,
        tableConfig: {
          tableData: [],
          columns: [
            {
              field: 'order', title: 'TOP', width: 50, titleAlign: 'center', columnAlign: 'center',
              formatter: function (rowData,index,pagingIndex) {
                var currentIndex=index+pagingIndex;
                return currentIndex < 10 ? '<span style="color:red;font-weight: bold;">' + (currentIndex + 1) + '</span>' : currentIndex + 1
              }, isFrozen: true
            },
            {field: 'symbol', title: '股票代码', width: 80, titleAlign: 'center', columnAlign: 'center', isResize: true},
            {field: 'name', title: '股票名', width: 150, titleAlign: 'center', columnAlign: 'center', isResize: true},
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
                let num = rowData[field] * Math.pow(10,9);
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
                let num = rowData[field] * Math.pow(10,9);
                return num.toFixed(2);
              }
            }
          ]
        }
      }
    },
    async created() {
      let myDate = new Date;
      let year = myDate.getFullYear();//获取当前年
      let month = myDate.getMonth()+1;//获取当前月
      let day = myDate.getDate();//获取当前日
      let dateObj={
        year: year,
        month: month,
        day: day
      };
      this.date = this.dateObjToStr(dateObj);
      await this.getRawData(this.date);
      await this.getTableData();
    },
    methods:{
      async getRawData(date){
        //使用axios的get请求向后台获取用户信息数据
        try {
          let ret = await this.$axios.get('/contribution', {
              params: {
                date: date
              }
            }
          );

          let websites = ret.data;
          let websit;
          for (let i in websites) {
            websit = {
              order: websites[i].id,
              symbol: websites[i].symbol,
              name: websites[i].name,
              pctChg: websites[i].pctChg,
              contribution: websites[i].contribution,
              contribution5: websites[i].contribution5,
            };
            this.rawData.push(websit);
          }
          this.total = this.rawData.length;
        }catch(err){
          console.log(err);
          alert("请求出错！");
        }
      },
      // 请求等待控制
      request(){
        this.isLoading=true;
        setTimeout(x=>{
          this.isLoading=false;
        },20000);
      },
      // 获取 table 组件每次操作后的参数（重新去请求数据）
      sortChange(params){
        console.log(params);
        if (params.height.length > 0){
          this.tableConfig.tableData.sort(function (a, b) {
            if (params.height === 'asc'){
              return a.height - b.height;
            }else if(params.height === 'desc'){
              return b.height - a.height;
            }else{
              return 0;
            }
          });
        }
      },
      //获取当前页数据
      getTableData(){
        this.tableConfig.tableData=this.rawData.slice((this.pageIndex-1) * this.pageSize,this.pageIndex * this.pageSize);
      },
      pageChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getTableData();
      },
      pageSizeChange(pageSize){
        this.pageIndex = 1;
        this.pageSize = pageSize;
        this.getTableData();
      },
      async refresh(){
        this.rawData=[];  //重置数据
        await this.getRawData(this.date);
        await this.getTableData();
      },
      dateChange(obj){
        this.date = this.dateObjToStr(obj);
      },
      dateObjToStr(obj){
        var year = obj.year;
        var month = obj.month;
        var day = obj.day;

        if(month<10){
          month = "0" + month;
        }
        if(day<10){
          day = "0" + day;
        }

        return year + "" + month + "" + day;
      }
    },
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo{
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
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
