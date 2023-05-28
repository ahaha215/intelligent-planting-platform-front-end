//导入封装请求的js文件
import request from "../util/request.js";  
 
// ------------------------------------ 用户 Api 开始 ------------------------------------//
export function loginApi(user) {
  return request({
    url: `/user/login`, 
    method: "post",
    data: user
  });
}

export function saveUserApi(user) {
  return request({
    url: `/user/saveUser`, 
    method: "post",
    data: user
  });
}

export function pageUserListApi(current,limit) {
  return request({
    url: `/user/pageUserList/${current}/${limit}`, 
    method: "get"
  });
}

export function deleteUserApi(userId) {
  return request({
    url: `/user/deleteUser/${userId}`, 
    method: "delete"
  });
}

export function findUserByIdApi(userId) {
  return request({
    url: `/user/findUserById/${userId}`, 
    method: "get"
  });
}

export function modifyUser(user) {
  return request({
    url: `/user/modifyUser`, 
    method: "post",
    data: user
  });
}

export function pageUserListByLikeApi(userSearch) {
  return request({
    url: `/user/pageUserListByLike`, 
    method: "post",
    data: userSearch
  });
}

// ------------------------------------ 用户 Api 结束 ------------------------------------//



// ------------------------------------ 报警 Api 开始 ------------------------------------//
export function saveAlarmRecordApi(alarmRecord) {
  return request({
    url: `/alarmRecord/saveRecord`, 
    method: "post",
    data: alarmRecord
  });
}

export function deleteAlarmRecordApi(recordId) {
  return request({
    url: `/alarmRecord/deleteRecord/${recordId}`, 
    method: "delete"
  });
}

export function pageAlarmRecordListByConditionApi(alarmRecordQueryCondition) {
  return request({
    url: `/alarmRecord/pageAlarmRecordListByCondition`, 
    method: "post",
    data: alarmRecordQueryCondition
  });
}

export function handleAlarmRecordApi(alarmRecord) {
  return request({
    url: `/alarmRecord/handleRecord`, 
    method: "post",
    data: alarmRecord
  });
}

export function sendAlarmEmailApi(alarmType) {
  return request({
    url: `/alarmNotice/sendAlarmEmail`, 
    method: "post",
    data: alarmType
  });
}

// ------------------------------------ 报警 Api 结束 ------------------------------------//