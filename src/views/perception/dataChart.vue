<template>
  <div class="data-chart-root">
    <div class="box">
      <h2>图表分析</h2>
      <div class="chart clearfix">
        <div id="TemChart" class="left chart-item"></div>
        <div id="HumChart" class="left chart-item"></div>

        <div id="soilTem_1Chart" class="left chart-item"></div>
        <div id="soilHum_1Chart" class="left chart-item"></div>
        <div id="soilTem_2Chart" class="left chart-item"></div>
        <div id="soilHum_2Chart" class="left chart-item"></div>

        <div id="ppmChart" class="left chart-item"></div>
        <div id="pHChart" class="left chart-item"></div>
        <div id="COChart" class="left chart-item"></div>
        <div id="windSpdChart" class="left chart-item"></div>
        <div id="rain_curChart" class="left chart-item"></div>
        <div id="lightChart" class="left chart-item"></div>
        <div id="uRaysChart" class="left chart-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      loading: true,
      divisorData: {
        Tem: 0.0,
        Hum: 0.0,

        soilTem_1: 0.0,
        soilHum_1: 0.0,
        soilTem_2: 0.0,
        soilHum_2: 0.0,

        ppm: 0,
        pH: 0.0,
        CO: 0.0,
        windSpd: 0.0,
        rain_cur: 0,
        light: 0,
        uRays: 0,
      },
      chartData: {
        TemX: [],
        TemY: [],
        HumX: [],
        HumY: [],

        soilTem_1X: [],
        soilTem_1Y: [],
        soilHum_1X: [],
        soilHum_1Y: [],
        soilTem_2X: [],
        soilTem_2Y: [],
        soilHum_2X: [],
        soilHum_2Y: [],

        ppmX: [],
        ppmY: [],

        pHX: [],
        pHY: [],
        COX: [],
        COY: [],
        windSpdX: [],
        windSpdY: [],
        rain_curX: [],
        rain_curY: [],
        lightX: [],
        lightY: [],
        uRaysX: [],
        uRaysY: [],
      },
    };
  },
  created() {
    this.getBKData();
    this.initChart();
  },
  methods: {
    initChart() {
      let that = this;

      const interval = setInterval(function () {
        const loading = that.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        if (that.divisorData.Tem) {
          loading.close();
          clearInterval(interval);
        }
      }, 100);

      // 温度
      setInterval(function () {
        if (that.chartData.TemX.length > 3) {
          that.chartData.TemX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.TemX.push(time);

          that.chartData.TemY.shift();
          that.chartData.TemY.push(that.divisorData.Tem);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.TemX.push(time);
          that.chartData.TemY.push(that.divisorData.Tem);
        }

        var chartDom = document.getElementById("TemChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "温度",
            subtext: "棚内温度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.TemX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.TemY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 湿度
      setInterval(function () {
        if (that.chartData.HumX.length > 3) {
          that.chartData.HumX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.HumX.push(time);

          that.chartData.HumY.shift();
          that.chartData.HumY.push(that.divisorData.Hum);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.HumX.push(time);
          that.chartData.HumY.push(that.divisorData.Hum);
        }

        var chartDom = document.getElementById("HumChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "湿度",
            subtext: "棚内湿度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.HumX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.HumY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 一层土温
      setInterval(function () {
        if (that.chartData.soilTem_1X.length > 3) {
          that.chartData.soilTem_1X.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.soilTem_1X.push(time);

          that.chartData.soilTem_1Y.shift();
          that.chartData.soilTem_1Y.push(that.divisorData.soilTem_1);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.soilTem_1X.push(time);
          that.chartData.soilTem_1Y.push(that.divisorData.soilTem_1);
        }

        var chartDom = document.getElementById("soilTem_1Chart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "土温",
            subtext: "一层土温度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.soilTem_1X,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.soilTem_1Y,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 一层土湿
      setInterval(function () {
        if (that.chartData.soilHum_1X.length > 3) {
          that.chartData.soilHum_1X.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.soilHum_1X.push(time);

          that.chartData.soilHum_1Y.shift();
          that.chartData.soilHum_1Y.push(that.divisorData.soilHum_1);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.soilHum_1X.push(time);
          that.chartData.soilHum_1Y.push(that.divisorData.soilHum_1);
        }

        var chartDom = document.getElementById("soilHum_1Chart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "土湿",
            subtext: "一层土湿度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.soilHum_1X,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.soilHum_1Y,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 二层土温
      setInterval(function () {
        if (that.chartData.soilTem_2X.length > 3) {
          that.chartData.soilTem_2X.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.soilTem_2X.push(time);

          that.chartData.soilTem_2Y.shift();
          that.chartData.soilTem_2Y.push(that.divisorData.soilTem_2);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.soilTem_2X.push(time);
          that.chartData.soilTem_2Y.push(that.divisorData.soilTem_2);
        }

        var chartDom = document.getElementById("soilTem_2Chart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "土温",
            subtext: "二层土温度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.soilTem_2X,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.soilTem_2Y,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 二层土湿
      setInterval(function () {
        if (that.chartData.soilHum_2X.length > 3) {
          that.chartData.soilHum_2X.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.soilHum_2X.push(time);

          that.chartData.soilHum_2Y.shift();
          that.chartData.soilHum_2Y.push(that.divisorData.soilHum_2);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.soilHum_2X.push(time);
          that.chartData.soilHum_2Y.push(that.divisorData.soilHum_2);
        }

        var chartDom = document.getElementById("soilHum_2Chart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "土湿",
            subtext: "二层土湿度",
          },
          xAxis: {
            type: "category",
            data: that.chartData.soilHum_2X,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.soilHum_2Y,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // PM2.5
      setInterval(function () {
        if (that.chartData.ppmX.length > 3) {
          that.chartData.ppmX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.ppmX.push(time);

          that.chartData.ppmY.shift();
          that.chartData.ppmY.push(that.divisorData.ppm);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.ppmX.push(time);
          that.chartData.ppmY.push(that.divisorData.ppm);
        }

        var chartDom = document.getElementById("ppmChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "PM",
            subtext: "PM2.5",
          },
          xAxis: {
            type: "category",
            data: that.chartData.ppmX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.ppmY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 酸碱度
      setInterval(function () {
        if (that.chartData.pHX.length > 3) {
          that.chartData.pHX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.pHX.push(time);

          that.chartData.pHY.shift();
          that.chartData.pHY.push(that.divisorData.pH);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.pHX.push(time);
          that.chartData.pHY.push(that.divisorData.pH);
        }

        var chartDom = document.getElementById("pHChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "PH",
            subtext: "PH",
          },
          xAxis: {
            type: "category",
            data: that.chartData.pHX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.pHY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // CO
      setInterval(function () {
        if (that.chartData.COX.length > 3) {
          that.chartData.COX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.COX.push(time);

          that.chartData.COY.shift();
          that.chartData.COY.push(that.divisorData.CO);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.COX.push(time);
          that.chartData.COY.push(that.divisorData.CO);
        }

        var chartDom = document.getElementById("COChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "CO",
            subtext: "CO",
          },
          xAxis: {
            type: "category",
            data: that.chartData.COX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.COY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 风速
      setInterval(function () {
        if (that.chartData.windSpdX.length > 3) {
          that.chartData.windSpdX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.windSpdX.push(time);

          that.chartData.windSpdY.shift();
          that.chartData.windSpdY.push(that.divisorData.windSpd);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.windSpdX.push(time);
          that.chartData.windSpdY.push(that.divisorData.windSpd);
        }

        var chartDom = document.getElementById("windSpdChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "风速",
            subtext: "windSpd",
          },
          xAxis: {
            type: "category",
            data: that.chartData.windSpdX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.windSpdY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 降雨量
      setInterval(function () {
        if (that.chartData.rain_curX.length > 3) {
          that.chartData.rain_curX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.rain_curX.push(time);

          that.chartData.rain_curY.shift();
          that.chartData.rain_curY.push(that.divisorData.rain_cur);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.rain_curX.push(time);
          that.chartData.rain_curY.push(that.divisorData.rain_cur);
        }

        var chartDom = document.getElementById("rain_curChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "降雨量",
            subtext: "rain_cur",
          },
          xAxis: {
            type: "category",
            data: that.chartData.rain_curX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.rain_curY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 光照量
      setInterval(function () {
        if (that.chartData.lightX.length > 3) {
          that.chartData.lightX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.lightX.push(time);

          that.chartData.lightY.shift();
          that.chartData.lightY.push(that.divisorData.light);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.lightX.push(time);
          that.chartData.lightY.push(that.divisorData.light);
        }

        var chartDom = document.getElementById("lightChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "光照量",
            subtext: "light",
          },
          xAxis: {
            type: "category",
            data: that.chartData.lightX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.lightY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);

      // 降雨量
      setInterval(function () {
        if (that.chartData.uRaysX.length > 3) {
          that.chartData.uRaysX.shift();
          let time = new Date().toLocaleTimeString();
          that.chartData.uRaysX.push(time);

          that.chartData.uRaysY.shift();
          that.chartData.uRaysY.push(that.divisorData.uRays);
        } else {
          let time = new Date().toLocaleTimeString();
          that.chartData.uRaysX.push(time);
          that.chartData.uRaysY.push(that.divisorData.uRays);
        }

        var chartDom = document.getElementById("uRaysChart");
        var myChart = echarts.init(chartDom);
        var option;

        option = {
          title: {
            text: "紫外线",
            subtext: "uRays",
          },
          xAxis: {
            type: "category",
            data: that.chartData.uRaysX,
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: that.chartData.uRaysY,
              type: "line",
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      }, 2000);
    },
    getBKData() {
      let that = this;
      setInterval(function () {
        that.divisorData = that.$websocket.divisorInfo;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.data-chart-root .box {
  padding-left: 300px;
  padding-top: 50px;
  width: calc(100% - 300px);
}

.data-chart-root .box .chart {
  max-height: calc(100vh - 210px);
  overflow-y: scroll;
}

.data-chart-root h2 {
  border-bottom: 1px solid rgb(211, 211, 211);
  padding-bottom: 20px;
  font-weight: bolder;
  margin-bottom: 50px;
}

.chart-item {
  width: 32%;
  height: 400px;
}
</style>