<template>
  <div class="app-container">
    <h3>描述：对自动交易的盈亏情况进行记录并显示</h3>


    <ul>
      <li :class="[index == status  ? 'bechoice' : '']" v-for="(item,index) in list" :key="index" @click="choice(index)">
        {{item.text}}
      </li>
    </ul>
    <h1>status={{status}}</h1>
    <h1>{{msg[status]}}</h1>
    <h1>theme[status]={{theme[status]}}</h1>


    <div id="myChart" :style="{ width:'900px', height: '300px'}"></div>
  </div>
</template>
<script>
  export default {
    name: "Recharge",
    data() {
      return {
        msg:['一','二','三','四','五','六'],
        theme:['dark','chalk','shine','vintage','westeros','macarons'],
        status: 0,
        list: [
          { text: "dark" },
          { text: "chalk" },
          { text: "shine" },
          { text: "vintage" },
          { text: "westeros" },
          { text: "macarons" }
        ],
        option: {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      };
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      choice(index) {
        this.status = index;
        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[this.status])
        //this.myChart.setTheme(this.theme[this.status])//不生效
        this.myChart.setOption(this.option,true);
      },

      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        //theme[0]->dark主题
        // myChart.dispose();
        this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[0])
        // 绘制图表
        this.myChart.setOption(this.option,true);
       // myChart.setTheme(this.theme[0]);// 设置失败

      }
    }
  };
</script>

<style scoped>
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
  }
  li {
    width: 200px;
    height: 30px;
    background: #eeeeee;
    color: #000;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 5px;
  }
  .bechoice {
    background: red;
    color: #eeeeee;
  }

</style>
