<template>
  <div>
      <Chart :option="option" style="height: 400px"/>
  </div>
</template>

<script>
import Chart from "../../components/Chart.vue";
import random from 'lodash/random';
export default {
  components: {
    Chart,
  },
  data() {
      // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
      return {
          option,
          interval: null
      }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.option.series[0].data = this.option.series[0].data.map(() => {
        return random(100)
      });
      this.option = {...this.option};
    }, 3000);
    
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style>
</style>