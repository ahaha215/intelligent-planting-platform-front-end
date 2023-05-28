import VueRouter from 'vue-router'
import Vue from 'vue'



// 引入组件
import Login from "../views/login"
import Home from "../views/home"
import OnlineData from "../views/perception/onlineData"
import DataChart from "../views/perception/dataChart"
import ModelControl from "../views/control/modelControl"
import SwitchControl from "../views/control/switchControl"
import AlarmRecords from "../views/dataCenter/alarmRecord"
import UserManager from "../views/manager/userManager"


Vue.use(VueRouter)

// 创建并暴露一个路由器
export default new VueRouter({
    routes:[
        {
            path:'/',
            component: Login,
            meta:{hideFlag: true}
        },

        {
            path:'/home',
            component: Home
        },

        {
            path:'/perception/onlineData',
            component: OnlineData
        },

        {
            path:'/perception/dataChart',
            component: DataChart
        },

        {
            path:'/control/modelControl',
            component: ModelControl
        },

        {
            path:'/control/switchControl',
            component: SwitchControl
        },

        {
            path:'/dataCenter/alarmRecord',
            component: AlarmRecords
        },

        {
            path:'/manager/userManager',
            component: UserManager
        },

    ]
})
