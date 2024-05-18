import Axios from "axios";
import { api } from "../constant";
import { MApiGetSale, MSale } from "../interface/saleforecase.interface";
const http = Axios.create({
    baseURL: api,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8;json/html; charset=UTF-8',
        // 'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    }
});


export function API_GET_SALE(param: MApiGetSale) {
    return new Promise<MSale[]>(resolve => {
        http.post(`/get/saleforecase`, param).then((res) => {
            resolve(res.data);
        })
    })
}
