import Axios from "axios";

var API = Axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: 'https://www.ifnxs.com',
  // baseURL: 'http://jkinfo.cetc36.cn:8091',
  timeout: 50000 // 请求超时时间
})

var APIUPLOAD = Axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: 'https://www.ifnxs.com',
  // baseURL: 'http://jkinfo.cetc36.cn:8091',
  timeout: 50000, // 请求超时时间
  headers: {'Content-Type': 'multipart/form-data'}
})

// request拦截器
API.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
API.interceptors.response.use(
  response => {
    const res = response.data
    if(res){
      if (res.code !== 0) {
        return Promise.reject(response)
      } else {
        return response
      }
    }else{
      return response
    }
  },
  error => {
    if(error.response.data.code=='401001'){
      window.$AppMain.$message({ type: 'error', message: "登录信息过期，请重新登录" })
      return window.$AppMain.$router.push({name:'login'})
    }
    window.$AppMain.$message({ type: 'error', message: error.response.data.message })
    return Promise.reject(error);
  }
)

// 创建api方法
function create(prefix) {
  return {
    // 创建
    create: function (data) {
      return API.post(prefix, data).then(res => res.data)
    },
    //特殊创建
    createA: function (x, data) {
      return API.post(prefix + `/${x}`, data).then(res => res.data)
    },
    //特殊创建
    createB: function (x, data, config) {
      return API.post(prefix, data, config).then(res => res.data)
    },
    // 获取详情
    get: function (id) {
      return API.get(prefix + `/${id}`).then(res => res.data)
    },
    //获取特殊
    getx: function (id, x) {
      return API.get(prefix + `/${id}\/${x}`).then(res => res.data)
    },
    gety: function (params) {
      return API.get(prefix + `/${params}`).then(res => res.data)
    },
    // 更新
    update: function (id, data) {
      return API.put(prefix + `/${id}`, data).then(res => res.data)
    },
    // 更新无ID
    updateA: function (data) {
      return API.put(prefix, data).then(res => res.data)
    },
    // 更新 PUT <prefix>/<id>/<x>
    updatex: function (id, x, data) {
      return API.put(prefix + `/${id}\/${x}`, data).then(res => res.data)
    },
    updatey: function ( x) {
      return API.put(prefix + x ).then(res => res.data)
    },

    // 删除
    delete: function (id) {
      return API.delete(prefix + `/${id}`).then(res => res.data)
    },
    // 获取多个
    find: function (params) {
      return API.get(prefix, { params: { ...params } }).then(res => res.data)
    },
    //特殊获取多个
    findx: function (id, params) {
      return API.get(prefix + `/${id}`, { params: { ...params } }).then(res => res.data)
    },
    // POST查询
    query: function (data) {
      return API.post(prefix + '/query', data).then(res => res.data)
    },
    // 特殊请求
    especially: function (path, id, data) {
      return API.put(prefix + `${id}` + path, data).then(res => res.data)
    }
  }
}

export {
  API,
  APIUPLOAD,
  create
}


