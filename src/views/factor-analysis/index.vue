<template>
  <div class="app-container">
    <h3>描述：因子分析</h3>
    <h3>主要功能：IC序列分析、IC衰减、收益率分析、换手率分析、买入信号衰减与反转、行业板块分析。</h3>

    <div id="toolbar">
      <div id="theme">
        <span>Theme:</span>
        <p :title="item.text" :class="item.text" v-for="(item,index) in list" :key="index" @click="choice(index)" ><span></span></p>
      </div>
    </div>

    <div id="myChart" :style="{ width:'900px', height: '450px'}"></div>

  </div>
</template>

<script>
  export default {
    name: 'testview',
    data () {
      return {
        tree:[],
        msg:['一','二','三'],
        theme:['default','light','dark'],
        status: 0,
        list: [
          { text: "default" },
          { text: "light" },
          { text: "dark" }
        ],
        option: {
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'line'
          }]
        }
      }
    },mounted(){
      /*
            this.option = this.setOption(this.getData3())
            this.drawLine();
            */
      this.drawLine();
      this.$axios
        .get('/ic-analysis')
        .then(res => {
          this.tree = res.data; //把取item的数据赋给 tree
          console.log(res.data);
          this.option = this.setOption(res.data)
          this.drawLine();
        })
        .catch(err => {
          alert('请求失败');
        })
    },
    methods: {
      choice(index) {
        this.status = index;
        this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
        this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[this.status])
        //this.myChart.setTheme(this.theme[this.status])//不生效
        this.myChart.setOption(this.option,true);
      },
      setOption(data){
        return{
          xAxis: {
            type: 'category',
            data: data[0]
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: data[1],
            type: 'line'
          }]
        }
      },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[0])
        // 绘制图表
        this.myChart.setOption(this.option,true);
      }
    }
  }
</script>

<style>

  #toolbar {
    height: 30px;
    position: fixed;
    margin-top: 20px;
    width: 500px;
    right: 0;
    z-index: 200
  }

  #theme {
    float: right;
    margin-right: 30px
  }

  #theme>span {
    vertical-align: middle;
    display: inline-block;
    margin-right: 10px;
    font-size: 16px;
    font-weight: bold
  }

  #theme p {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 0 5px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    background: #fff
  }

  #theme p span {
    display: inline-block;
    width: 26px;
    height: 26px;
    margin-left: 2px;
    margin-top: 2px
  }

  #theme p:hover {
    -webkit-box-shadow: 0 0 8px rgba(0,0,0,0.1);
    box-shadow: 0 0 8px rgba(0,0,0,0.1)
  }

  #theme p.selected {
    border: 1px solid #e43c59
  }

  #theme p.default span {
    background: #c23531;
    background: linear-gradient(135deg, #de7e7b 0%, #c23531 50%, #2f4554 51%, #547b95 100%);
  }

  #theme p.light span {
    background: #37A2DA;
    background: linear-gradient(135deg, #8dcaea 0%, #37A2DA 50%, #ffd85c 51%, #fff0c2 100%)
  }

  #theme p.dark {
    background: #333
  }

  #theme p.dark span {
    background: #dd6b66;
    background: linear-gradient(135deg, #f0bcb9 0%, #dd6b66 50%, #759aa0 51%, #b1c6ca 100%)
  }

  #toolbar #theme {
    padding: 4px 10px;
    background: #fff;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 15px rgba(0,0,0,0.1);
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    border: 1px solid #aaa
  }

  #toolbar #theme.dark {
    background: #222;
    color: #fff
  }

  .popover-title {
    color: #000
  }

  .theme-palette {
    color: #000;
    font-size: 18px
  }

  .theme-palette span {
    width: 20px;
    height: 20px;
    margin-left: 3px;
    display: inline-block
  }

</style>


