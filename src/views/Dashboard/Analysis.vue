<template>
  <div>
      <Chart :option="option" style="height: 400px"/>
  </div>
</template>

<script>
import Chart from "../../components/Chart.vue";
import axios from 'axios'
export default {
  components: {
    Chart,
  },
  data() {
      // 指定图表的配置项和数据
      var option = {};
      return {
          option,
          interval: null
      }
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000); 
  },
  methods: {
    getChartData() {
      axios.get('/api/dashboard/chart', {params: {ID: 12345}}).then(response => {
        this.option = {
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
                data: response.data
            }]
        }
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
<style>
</style>