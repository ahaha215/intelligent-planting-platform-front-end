// 是否已经连接上ws
let isOpenSocket = false

//心跳间隔，单位毫秒
let heartBeatDelay = 3000
let heartBeatInterval = null

//心跳时发送的消息文本
let heartBeatText = "PING"

//最大重连次数
let reconnectTimes = 10
let reconnectInterval = null

//重连间隔，单位毫秒
let reconnectDelay = 1000

let wsUrl = "wss://www.bigiot.net:8484/"

let socketTask = null


// 这个参数是防止重连失败之后onClose方法会重复执行reconnect方法，导致重连定时器出问题
// 连接并打开之后可重连，且只执行重连方法一次
let canReconnect = false

let divisorInfo = {
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
    uRays: 0
}

// 封装的对象，最后以模块化向外暴露，
// init方法 初始化socketTask对象
// completeClose方法 完全将socketTask关闭（不重连）
// 其他关于socketTask的方法与uniapp的socketTask api一致
let ws = {
    ç: null,
    init,
    heartBeat,
    send,
    reconnect,
    completeClose,
    divisorInfo
}


let alarmWindFlag = 0;
let alarmFireFlag = 0;


function init() {

    socketTask = new WebSocket(wsUrl)

    socketTask.onopen = function () {
        console.log("websocket连接成功")
        clearInterval(heartBeatInterval)
        clearInterval(reconnectInterval)
        isOpenSocket = true
        canReconnect = true
        //开启心跳机制
        heartBeat()
    }

    socketTask.onmessage = function (res) {
        //自定义处理onMessage方法
        console.log("贝壳物联发来消息---->" + res.data)

        // 将 Qcc 的奇葩数据转换为对象
        let resStr = res.data;
        let resObj = JSON.parse(resStr);

        if (resObj.M == "say") {
            // console.log(resObj)
            let sign = resObj.SIGN;
            switch (sign) {
                case "loc_E":
                    divisorInfo.loc_E = resObj.C
                    break;
                case "loc_N":
                    divisorInfo.loc_N = resObj.C
                    break;
                case "Tem":
                    divisorInfo.Tem = resObj.C
                    break;
                case "Hum":
                    divisorInfo.Hum = resObj.C
                    break;
                case "soilTem_1":
                    divisorInfo.soilTem_1 = resObj.C
                    break;
                case "soilHum_1":
                    divisorInfo.soilHum_1 = resObj.C
                    break;
                case "soilTem_2":
                    divisorInfo.soilTem_2 = resObj.C
                    break;
                case "soilHum_2":
                    divisorInfo.soilHum_2 = resObj.C
                    break;
                case "ppm":
                    divisorInfo.ppm = resObj.C
                    break;
                case "pH":
                    divisorInfo.pH = resObj.C
                    break;
                case "CO":
                    divisorInfo.CO = resObj.C

                    if ((resObj.C >= 1.5) && (alarmFireFlag == 0)) {

                        console.log("开始报警！")
        
                        let type = "火灾报警";
                        alarmNotice(type);
                        alarmFireFlag = 1;
                    }
                    if ((resObj.C < 1.5) && (alarmFireFlag == 1)) {
                        alarmFireFlag = 0;
                    }

                    break;
                case "windSpd":
                    divisorInfo.windSpd = resObj.C
                    break;
                case "rain_cur":
                    divisorInfo.rain_cur = resObj.C
                    break;
                case "light":
                    divisorInfo.light = resObj.C
                    break;
                case "uRays":
                    divisorInfo.uRays = resObj.C
            }
        }

        var storage = window.localStorage;
        storage.setItem("bkData", JSON.stringify(ws.divisorInfo));


        // 待完善
        // if (resObj.M == "update") {
            // 大风报警
            // if ((resObj.V["25906"] == 1) && (alarmWindFlag == 0)) {
            //     let type = "大风报警";
            //     //alarmNotice(type);
            //     alarmWindFlag = 1;
            // }
            // if ((resObj.V["25906"] == 0) && (alarmWindFlag == 1)) {
            //     alarmWindFlag = 0;
            // }

            // 火灾报警
            // if ((resObj.SIGN["25811"] == 1) && (alarmFireFlag == 0)) {

            //     console.log("开始报警！")

            //     let type = "火灾报警";
            //     //alarmNotice(type);
            //     alarmFireFlag = 1;
            // }
            // if ((resObj.V["25811"] == 0) && (alarmFireFlag == 1)) {
            //     alarmFireFlag = 0;
            // }

        // }
    }

    socketTask.onclose = function () {
        if (isOpenSocket) {
            console.log("websocket与服务器断开")
        } else {
            console.log("连接失败")
        }
        isOpenSocket = false

        if (canReconnect) {
            reconnect()
            canReconnect = false
        }
    }

    ws.socketTask = socketTask
}

function heartBeat() {
    heartBeatInterval = setInterval(() => {
        console.log(heartBeatText)
        send(JSON.stringify(heartBeatText));
    }, heartBeatDelay)
}

function send(value) {
    ws.socketTask.send(value);
    console.log("消息发送成功：" + value)
}

function reconnect() {
    //停止发送心跳
    clearInterval(heartBeatInterval)

    //如果不是人为关闭的话，进行重连
    if (!isOpenSocket) {
        let count = 0;
        reconnectInterval = setInterval(() => {
            console.log("正在尝试重连")
            init();
            count++
            //重连一定次数后就不再重连
            if (count >= reconnectTimes) {
                clearInterval(reconnectInterval)
                console.log("网络异常或服务器错误")
            }
        }, reconnectDelay)
    }
}

function completeClose() {
    //先将心跳与重连的定时器清除
    clearInterval(heartBeatInterval)
    clearInterval(reconnectInterval)
    canReconnect = false
    ws.socketTask.close()
}

function alarmNotice(type) {

    console.log("jr alarmNotice...")
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:5000/alarmNotice/alarmNotice')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let data = "type=" + type;
    xhr.send(data)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText)
        }
    }
}

module.exports = ws
