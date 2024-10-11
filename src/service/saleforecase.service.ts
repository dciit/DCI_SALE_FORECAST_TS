import Axios from "axios";
import { api } from "../constant";
import { DictMstr, MApiGetSale, MChoose, MDistribution, MGetSale, MUpdateSale, Status } from "../interface/saleforecase.interface";
import { MCoreInterface_Parent, ParamDelectModelOfCustomer } from "../Interface";
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

export function API_GETCUSTOMER_SETTING() {
    return new Promise<string[]>(resolve => {
        http.get(`/getCustomerSetting`).then((res) => {
            resolve(res.data);
        })
    })
}

export function API_GET_MODEL_BY_CUSTOMER(code: string) {
    return new Promise<any>(resolve => {
        http.get(`/getModelByCustomerCode/${code}`).then((res) => {
            resolve(res.data);
        })
    })
}
export function API_GET_MODEL() {
    return new Promise<string[]>(resolve => {
        http.get(`/saleforecase/customersetting/getmodel`).then((res) => {
            resolve(res.data);
        })
    })
}



export function API_ADD_MODEL_TO_CUSTOMER(param: DictMstr) {
    return new Promise<Status>(resolve => {
        http.post(`/saleforecase/customersetting/addmodeltocustomer`, param).then((res) => {
            resolve(res.data);
        })
    })
}



export function API_DEL_MODEL_OF_CUSTOMER(param: ParamDelectModelOfCustomer) {
    return new Promise<Status>(resolve => {
        http.post(`/saleforecase/customersetting/delmodelofcustomer`, param).then((res) => {
            resolve(res.data);
        })
    })
}


export function API_COMPRESSOR(itemModel:string,status:string) {
    return new Promise<MCoreInterface_Parent[]>(resolve => {
        http.get(`/GetCompressordata/${itemModel}/${status}`).then((res) => {
            resolve(res.data);
        })
    })
}