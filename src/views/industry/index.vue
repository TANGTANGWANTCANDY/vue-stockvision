<template>
  <div class="app-container">

    <div id="toolbar">
      <div id="theme">
        <span>Theme:</span>
        <p :title="item.text" :class="item.text" v-for="(item,index) in list" :key="index" @click="choice(index)" ><span></span></p>
      </div>
    </div>

    <!--p>{{tree}}</p-->

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
  export default {
    name: 'testview',
    data () {
      return {
        tree: [],
        msg:['一','二','三'],
        theme:['default','light','dark'],
        status: 0,
        formatUtil: this.$echarts.format,
        list: [
          { text: "default" },
          { text: "light" },
          { text: "dark" }
        ],
        option : {}
    }
    },

    mounted(){
/*
      this.option = this.setOption(this.getData3())
      this.drawLine();
      */
      this.$axios
        .get('/td/20180102/list')
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

      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'),this.theme[0])
        // 绘制图表
        this.myChart.setOption(this.option,true);
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
            color: [
              '#085421',
              '#961010',
              '#6d1414',
              '#be0808',
              '#e41414',
              '#0e6f2f',
              '#424453',
              '#1aa448',
              '#00d641'
              ],
            colorMappingBy: 'id',

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

  #toolbar {
    height: 30px;
    position: fixed;
    margin-top: 50px;
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
