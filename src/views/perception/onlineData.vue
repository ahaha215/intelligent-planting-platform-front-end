<template>
  <div class="online-data-root">
    <div class="divisor-info">
      <h2>因子信息</h2>
      <ul class="clearfix">
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">棚内温度（℃）</div>
            <div class="val">{{ divisorData.Tem }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">棚内湿度（%RH）</div>
            <div class="val">{{ divisorData.Hum }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">一层土壤温度（℃）</div>
            <div class="val">{{ divisorData.soilTem_1 }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">一层土壤湿度（%）</div>
            <div class="val">{{ divisorData.soilHum_1 }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">二层土壤温度（℃）</div>
            <div class="val">{{ divisorData.soilTem_2 }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">二层土壤湿度（%）</div>
            <div class="val">{{ divisorData.soilHum_2 }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">PM2.5（ug/m³）</div>
            <div class="val">{{ divisorData.ppm }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">PH（mol·L）</div>
            <div class="val">{{ divisorData.pH }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">CO（ppm）</div>
            <div class="val">{{ divisorData.CO }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">风速（m/s）</div>
            <div class="val">{{ divisorData.windSpd }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">降雨量（mm）</div>
            <div class="val">{{ divisorData.rain_cur }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">光照（cd/m²）</div>
            <div class="val">{{ divisorData.light }}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">紫外线（级）</div>
            <div class="val">{{ divisorData.uRays }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      divisorData: {
        loc_E: 0.0,
        loc_N: 0.0,

        Tem: 0.0,
        Hum: 0.0,

        soilTem_1: 0.0,
        soilHum_1: 0,
        soilTem_2: 0,
        soilHum_2: 0,

        ppm: 0,
        pH: 0.0,
        CO: 0.0,
        windSpd: 0.0,
        rain_cur: 0,
        light: 0,
        uRays: 0,
      },
    };
  },
  created() {
    this.getBKData();
  },
  methods: {
    getBKData() {
      let that = this;
      setInterval(function () {
        that.divisorData = that.$websocket.divisorInfo;
      }, 1000);
    }
  },
};
</script>

<style scoped>
.online-data-root .divisor-info {
  width: calc(100% - 310px);
  height: 100%;
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  overflow: auto;
  background-color: white;

  padding-top: 20px;
  padding-left: 20px;
}

.online-data-root .divisor-info ul li {
  height: 100px;
  width: calc(25% - 30px);
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
  margin-top: 20px;
}

.online-data-root .divisor-info ul li .icon {
  width: 80px;
  height: 100px;
  background-color: #47a96c;
  text-align: center;
}

.online-data-root .divisor-info ul li .icon img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

.online-data-root .divisor-info ul li .divisor-data {
  width: calc(100% - 100px);
  text-align: center;
  font-weight: bolder;
}

.online-data-root .divisor-info ul li .divisor-data .type {
  margin-top: 30px;
}

.online-data-root .divisor-info ul li .divisor-data .val {
  margin-top: 10px;
  color: #47a96c;
}

.online-data-root .divisor-info h2 {
  border-bottom: 1px solid rgb(211, 211, 211);
  padding-bottom: 20px;
  font-weight: bolder;
}
</style>