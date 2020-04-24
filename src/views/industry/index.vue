<template>
  <div class="app-container">

    <ThemeSwitch  @themeChange = "themeChange"></ThemeSwitch>
    <el-row>
      <el-col :span="12">
        <DateSelect @getIndustryDate="getIndustryDate"></DateSelect>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" :loading="industryButtonState" style="border-width:0;background-color:#587482;width:100px" @click="indButton">{{industryButtonText}}</el-button>
      </el-col>
    </el-row>
    <p>{{option.data}}</p>

    <!--大盘云图开始-->
    <div id="scgl_s1">
      <p id="hd">
        <i style=""></i>
        <span>大盘云图</span>
      </p>
    </div>

    <div id="myChart" :style="{ width:'1000px', height: '700px'}"></div>

    <div class="step" style="background:#00d641;">-4%</div>
    <div class="step" style="background:#1aa448;">-3%</div>
    <div class="step" style="background:#0e6f2f;">-2%</div>
    <div class="step" style="background:#085421;">-1%</div>
    <div class="step" style="background:#424453;">0%</div>
    <div class="step" style="background:#6d1414;">1%</div>
    <div class="step" style="background:#961010;">2%</div>
    <div class="step" style="background:#be0808;">3%</div>
    <div class="step" style="background:#e41414;">4%</div>

  </div>
</template>

<script>
  import ThemeSwitch from "@/components/ThemeSwitch/ThemeSwitch"
  import DateSelect from "@/components/SelectBox/DateSelect"
  export default {
    name: 'Industry',
    data () {
      return {
        tree: [],
        industryDate: "",
        industryButtonState: false,
        industryButtonText: "确认",
        formatUtil: this.$echarts.format,
        option : {}
      }
    },
    components:{
      ThemeSwitch,
      DateSelect,
    },
    // mounted(){
    //   this.$axios
    //     .get('/td/20180102/list')
    //     .then(res => {
    //       console.log(res.data);
    //       this.option = this.setOption(res.data)
    //       this.drawLine();
    //     })
    //     .catch(err => {
    //       alert('请求失败');
    //     })
    // },

    methods: {
      themeChange(theme) {
          this.myChart.dispose();//TODO: 释放图表，销毁对象并设置为null(多次操作可能会导致内存溢出)
          this.myChart = this.$echarts.init(document.getElementById('myChart'),theme)
          this.myChart.setOption(this.option,true);
        },

      getIndustryDate(value1){
        this.industryDate = value1
      },
      indButtonOn(){
        this.industryButtonState = true;
        this.industryButtonText = "正在加载";
      },
      indButtonOff(){
        this.industryButtonState = false;
        this.industryButtonText = "确认";
      },
      indButton(){
        this.indButtonOn();
        this.$axios
          .post('/industrycloud',{
            date:this.industryDate
          })
          .then(res => {
            console.log(res.data);
            this.option = this.setOption(res.data)
            this.drawLine();
            this.indButtonOff();
          })
          .catch(err => {
            if (err.message !== 'interrupt') {
              alert("请求失败")
            }
            console.log(err);
            this.indButtonOff();
          })
      },
      // 点击跳转函数
      setParams(code){
        var _this = this
        _this.$router.push({
          //跳转路由
          path:"/indDetails/indDetails",
          query:{
            //参数对象
            tsCode:code,
          }
        });
      },
      drawLine(){
        var _this = this
        // 基于准备好的dom，初始化echarts实例
        _this.myChart = this.$echarts.init(document.getElementById('myChart'),'default')
        // 绘制图表
        _this.myChart.setOption(this.option,true);
        _this.myChart.on('click', function (param){
          var name=param.name;
          var index=name.lastIndexOf('\n');
          var pushcode = name.substring(0, index)
          console.log('获取'+pushcode+'信息');
          _this.setParams(pushcode)
        });
      },
      getLevelOption() {
        return [
          {
            itemStyle: {
              borderColor: '#777',
              borderWidth: 0,
              gapWidth: 1
            },
            upperLabel: {
              show: false
            }
          },
          {
            itemStyle: {
              borderColor: '#000',
              borderWidth: 1,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#ddd'
              }
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              borderWidth: 1,
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        ];
      },
      setOption(data){
          return{
            series: [{
              type: 'treemap',
              left: 'center',
              visibleMin: 300,
              label: {
                show: true,
                formatter: '{b}'
              },
              upperLabel: {
                show: true,
                height: 15
              },
              itemStyle: {
                borderColor: '#fff'
              },
              levels: this.getLevelOption(),
              data: data,
            }]
          }
        },
      getData3(){
          let tree = [
            { name: "test1", value: 9,
              children: [
                {
                name: "test11",
                value: 1,
                id: 1,
                children: []
                },
                {
                  name: "test12",
                  value: 1,
                  id: 2,
                  children: []
                },
                {
                  name: "test13",
                  value: 1,
                  id: 3,
                  children: []
                },
                {
                  name: "test14",
                  value: 1,
                  id: 4,
                  children: []
                },
                {
                  name: "test15",
                  value: 1,
                  id: 5,
                  children: []
                },
                {
                  name: "test16",
                  value: 1,
                  id: 6,
                  children: []
                },
                {
                  name: "test17",
                  value: 1,
                  id: 7,
                  children: []
                },
                {
                  name: "test18",
                  value: 1,
                  id: 8,
                  children: []
                },
                {
                  name: "test19",
                  value: 1,
                  id: 9,
                  children: []
                }
              ]
            },
            {
              name: "test2", value: 9,
              children: [
                {
                  name: "test21",
                  value: 3,
                  id: 1,
                  children: []
                },
                {
                 name: "test22",
                 value: 3,
                  id: 2,
                  children: []
                },
                {
                  name: "test23",
                  value: 3,
                  id: 3,
                  children: []
                }
                ]
            }
            ];
          // this.tree = this.tree instanceof Array; //typeof
          // return [ { "name": "test1", "value": 10, "children": [] }, { "name": "test2", "value": 10, "children": [] } ];
          return tree;
        },
/*
测试数据
      getData2(){
        let _this = this;
        this.$axios
          .get('/list')
          .then(res => {
            _this.tree = res.data; //把取item的数据赋给 item
            console.log(res.data);
            return _this.tree;
          })
          .catch(err => {
            alert('请求失败');
          })
      },

      getData(){
        let _this = this;
        _this.tree = [{
          name: 'nodeA',            // First tree
          value: 10,
          children: [{
            name: 'nodeAa',       // First leaf of first tree
            value: 4
          }, {
            name: 'nodeAb',       // Second leaf of first tree
            value: 6
          }]
        }, {
          name: 'nodeB',            // Second tree
          value: 20,
          children: [{
            name: 'nodeBa',       // Son of first tree
            value: 20,
            children: [{
              name: 'nodeBa1',  // Granson of first tree
              value: 20
            }]
          }]
        },{
          name: 'nodeC',
          value: 20,
          children:[]
        }]

        return _this.tree;
      }
      */
    }
  }
</script>

<style>

  #scgl_s1 p {
    border-top: none;
    color: #313131;
    padding-top: 0;
    margin-bottom: 10px;
  }

  #scgl_s1 p i {
    border-left: solid 3px rgb(12, 94, 150);
  }

  #scgl_s1 p span {
    padding-left: 8px;
    font-family: '微软雅黑';
    font: 14px bold;
    font-weight: bold;
  }

  .step {
    width: 60px;
    height: 25px;
    line-height: 26px;
    cursor: default;
    display: inline-block;
    /*float: left;*/
    text-align: center;
    margin-right: 4px;
  }

</style>
