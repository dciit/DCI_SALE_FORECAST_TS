import Axios from "axios";
import { api } from "../constant";
import { MApiGetSale, MChoose, MDistribution, MGetSale, MUpdateSale } from "../interface/saleforecase.interface";
const http = Axios.create({
    baseURL: api,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});


export function API_GET_SALE(param: MApiGetSale) {
    return new Promise<MGetSale>(resolve => {
        http.post(`/saleforecase/get`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_GET_CHOOSE(column: string, year: string) {
    return new Promise<MChoose[]>(resolve => {
        http.get(`/saleforecase/get/filter/${encodeURIComponent(column)}/${year}`).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_UPDATE_SALE(param: MUpdateSale) {
    return new Promise<any>(resolve => {
        http.post(`/saleforecase/update`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_DISTRIBUTION(param: MDistribution) {
    return new Promise<any>(resolve => {
        http.post(`/saleforecase/distribution`, param).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_UN_DISTRIBUTION(param: MDistribution) {
    return new Promise<any>(resolve => {
        http.post(`/saleforecase/undistribution`, param).then((res) => {
            resolve(res.data);
        })
    })
}
