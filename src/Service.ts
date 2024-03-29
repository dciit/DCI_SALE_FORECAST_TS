
import Axios from "axios";
import { MCustomer, MGetSale, MLogin, MModel, MResponse, MSale, MStatusSale } from "./Interface";
const http = Axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});
const httpHR = Axios.create({
    baseURL: import.meta.env.VITE_API_HR,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});

export function API_UPDATE_SALE(param: MSale) {
    return new Promise(resolve => {
        http.post(`/update/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_SALE(param: MSale) {
    return new Promise<MGetSale>(resolve => {
        http.post(`/get/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_NEW_ROW(param: MSale) {
    return new Promise<MResponse>(resolve => {
        http.post(`/newrow/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_DISTRIBUTION_SALE(param: MSale) {
    return new Promise<MResponse>(resolve => {
        http.post(`/distribution/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_CLEAR_SALE(param: MSale) {
    return new Promise(resolve => {
        http.post(`/clear/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_LIST_STATUS_SALE(param: MSale) {
    return new Promise<MStatusSale[]>(resolve => {
        http.post(`/status/list/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_STATUS_SALE(param: MSale) {
    return new Promise<MStatusSale>(resolve => {
        http.post(`/status/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_CHANGE_STATUS(param: MSale) {
    return new Promise<MResponse>(resolve => {
        http.post(`/status/change/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_CUSTOMER() {
    return new Promise<MCustomer[]>(resolve => {
        http.get(`/sale/customer`).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_MODEL() {
    return new Promise<MModel[]>(resolve => {
        http.get(`/sale/model`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_LOGIN(param: MLogin) {
    return new Promise<MResponse>(resolve => {
        http.post(`/employee/login`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_CLEAR_EMPTY(param: MSale) {
    return new Promise(resolve => {
        http.post(`/clearempty/sale`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_CUSTOMER() {
    return new Promise(resolve => {
        http.get(`/get/customer`).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_GET_MODELS() {
    return new Promise(resolve => {
        http.get(`/get/model`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_PLTYPE() {
    return new Promise(resolve => {
        http.get(`/get/pltype`).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_GET_SEBANGO() {
    return new Promise(resolve => {
        http.get(`/get/sebango`).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_PRIVILEGE(module = '', component = '') {
    return new Promise(resolve => {
        httpHR.get(`/privilege/${module}/${component}`).then((res) => {
            resolve(res.data);
        }).catch(() => {
            resolve([]);
        })
    })
}



export function API_HR_LOGIN(empcode: string) {
    return new Promise<MLogin>(resolve => {
        httpHR.get(`/login/${empcode}`).then((res) => {
            resolve(res.data);
        })
    })
}