<template>
  <div class="home-root">
    <div class="equipment-map left">
      <h2>位置信息</h2>
      <div id="map"></div>
    </div>

    <div class="info right">
      <div class="basic">
        <h2>设备信息</h2>
        <div><span>设备编号：</span><span>28950</span></div>
        <div><span>设备名称：</span><span>28950</span></div>
        <div><span>设备地址：</span><span>辽宁省锦州市辽宁工业大学</span></div>
        <div><span>设备状态：</span><span>成功开启</span></div>
      </div>

      <div class="statistics">
        <h2>设备统计</h2>
        <div><span>感知因子（个）：</span><span>14</span></div>
        <div><span>控制因子（个）：</span><span>5</span></div>
        <div><span>历史报警（条）：</span><span>5</span></div>
      </div>
    </div>

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
            <div class="val">{{divisorData.pH}}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">CO（ppm）</div>
            <div class="val">{{divisorData.CO}}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">风速（m/s）</div>
            <div class="val">{{divisorData.windSpd}}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">降雨量（mm）</div>
            <div class="val">{{divisorData.rain_cur}}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">光照（cd/m²）</div>
            <div class="val">{{divisorData.light}}</div>
          </div>
        </li>
        <li class="left clearfix">
          <div class="icon left">
            <img src="../../assets/images/perception.png" alt="" />
          </div>
          <div class="divisor-data left">
            <div class="type">紫外线（级）</div>
            <div class="val">{{divisorData.uRays}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { BMPGL } from "../../util/map";

export default {
  data() {
    return {
      ak: "HtBjC6XWDpLiYNcKxZ0LlfDWpcHPhPCc",
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
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 传入密钥获取地图回调。
      BMPGL(this.ak)
        .then((BMapGL) => {
          // 创建地图实例
          let map = new BMapGL.Map("map");

          // 创建点坐标 axios => res 获取的初始化定位坐标
          let point = new BMapGL.Point(121.12616, 41.14612);

          var marker = new BMapGL.Marker(point);
          map.addOverlay(marker);

          // 初始化地图，设置中心点坐标和地图级别
          map.centerAndZoom(point, 8);

          //map.setMapType(BMAP_HYBRID_MAP)

          //开启鼠标滚轮缩放
          map.enableScrollWheelZoom(true);
          map.setHeading(64.5);
          map.setTilt(73);

          //设置地图旋转角度
          map.setHeading(1);
          //设置地图的倾斜角度
          map.setTilt(1);
        })
        .catch((err) => {
          console.log(err);
        });
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
.home-root {
  background-color: whitesmoke;
  height: calc(100vh - 70px);
}

.home-root .equipment-map {
  width: 45%;
  max-width: 50%;
  height: 450px;
  margin-top: 20px;
  background-color: white;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

.home-root .equipment-map h2 {
  border-bottom: 1px solid rgb(211, 211, 211);
  padding-bottom: 20px;
  font-weight: bolder;
}

#map {
  width: 100%;
  height: 400px;
  z-index: 1;
  margin-top: 20px;
}

.home-root .info {
  width: 25%;
  height: 450px;
  margin-top: 20px;
  background-color: white;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  margin-right: 20px;
}

.home-root .info h2 {
  border-bottom: 1px solid rgb(211, 211, 211);
  padding-bottom: 20px;
  font-weight: bolder;
}

.home-root .info .basic div {
  margin-top: 20px;
}

.home-root .info .statistics {
  margin-top: 80px;
}

.home-root .info .statistics div {
  margin-top: 20px;
}

.home-root .divisor-info {
  width: calc(100% - 310px);
  height: calc(100% - 560px);
  margin-top: 20px;
  margin-right: 20px;
  float: right;
  overflow: auto;
  background-color: white;

  padding-top: 20px;
  padding-left: 20px;
}

.home-root .divisor-info ul li {
  height: 100px;
  width: calc(25.58% - 30px);
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: whitesmoke;
  margin-top: 20px;
}

.home-root .divisor-info ul li .icon {
  width: 80px;
  height: 100px;
  background-color: #47a96c;
  text-align: center;
}

.home-root .divisor-info ul li .icon img {
  width: 50px;
  height: 50px;
  margin-top: 20px;
}

.home-root .divisor-info ul li .divisor-data {
  width: calc(100% - 100px);
  text-align: center;
  font-weight: bolder;
}

.home-root .divisor-info ul li .divisor-data .type {
  margin-top: 30px;
}

.home-root .divisor-info ul li .divisor-data .val {
  margin-top: 10px;
  color: #47a96c;
}

.home-root .divisor-info h2 {
  border-bottom: 1px solid rgb(211, 211, 211);
  padding-bottom: 20px;
  font-weight: bolder;
}
</style>