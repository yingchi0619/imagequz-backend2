import axios from 'axios';
const qs = require('qs');

/*实例化一个axios*/
const instance = axios.create({
    baseURL: 'http://localhost:3100',
    timeout: 30000
});

/*请求头拦截器*/
instance.interceptors.request.use(
    config => {
        let contentType = config.contentType;
        switch (contentType) {
            case 'formData':
                config.headers['Content-Type'] = 'multipart/form-data';

                break;
            case 'formUrlencoded':
                config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                break;
            default:
                config.headers['Content-Type'] = 'application/json';
                break;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 根据不同的状态码，生成不同的提示信息
const showStatus = status => {
    let message = '';
    // 这一坨代码可以使用策略模式进行优化
    switch (status) {
        case 400:
            message = '请求错误(400)';
            break;
        case 401:
            message = '未授权，请重新登录(401)';
            break;
        case 403:
            message = '拒绝访问(403)';
            break;
        case 404:
            message = '请求出错(404)';
            break;
        case 408:
            message = '请求超时(408)';
            break;
        case 500:
            message = '服务器错误(500)';
            break;
        case 501:
            message = '服务未实现(501)';
            break;
        case 502:
            message = '网络错误(502)';
            break;
        case 503:
            message = '服务不可用(503)';
            break;
        case 504:
            message = '网络超时(504)';
            break;
        case 505:
            message = 'HTTP版本不受支持(505)';
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return `${message}，请检查网络或联系管理员！`;
};

/*响应头拦截器*/
instance.interceptors.response.use(
    response => {
        const status = response.status;
        let msg = '';
        if (status < 200 || status >= 300) {
            // 处理http错误，抛到业务代码
            msg = showStatus(status);
            if (typeof response.data === 'string') {
                response.data = { msg };
            } else {
                response.data.msg = msg;
            }
        }
        return response.data;
    },
    error => {
        // 错误抛到业务代码
        error.data = {};
        error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！';
        return Promise.resolve(error);
    }
);

/*get请求方法*/
export function gets(data) {
    return instance.get(data.url, {
        params: data.params
    });
}

/*post请求方法*/
export function posts(data) {
    let getData = null;
    switch (data.type) {
        case 'formData':
            getData = new FormData();
            for (let k in data.params) {
                getData.append(k, data.params[k]);
            }
            break;
        case 'formUrlencoded':
            getData = qs.stringify({ data: data.params });
            break;
        default:
            getData = data.params;
            break;
    }
    return instance.post(data.url, getData, { contentType: data.type });
}
