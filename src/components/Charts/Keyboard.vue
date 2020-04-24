<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

import axios from 'axios'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    tradeDate: {
      type: String,
      default: '20181228'
    }
  },
  data() {
    return {
      chart: null,
      seriesData: []
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    seriesData(val, oldVal) {
      // console.log('seriesData:' + val)
      this.setOptions(val)
    },
    tradeDate(val, oldVal) {
      // console.log('tradeDate:' + val)
      this.getChangeDistribution()
    }
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.getChangeDistribution()
      this.setOptions(this.seriesData)
    },
    getChangeDistribution() {
      // console.log(this.tradeDate)
      axios.get('/market/pctChgDistribution', {
        params: {
          tradeDate: this.tradeDate
        }
      }).then((response) => {
        this.seriesData = response.data
      }).catch(function(error) { // 请求失败处理
        alert('当前日期没有进行交易或输入格式错误（输入示例：20181228）！')
        console.log(error)
      })
    },
    setOptions(seriesData) {
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['涨跌分布']
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          data: ['<=-7', '-7~-5', '-5~-3', '-3~0', '0', '0~3', '3~5', '5~7', '>=7']
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series: [{
          name: '涨跌分布',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: seriesData
        }]
      })
    }
  }
}
</script>
