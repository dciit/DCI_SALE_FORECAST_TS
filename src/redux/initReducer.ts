import { MFilterSale } from "../interface/saleforecase.interface";
export interface MRedux {
    login: boolean;
    empcode: string;
    username: string;
    name: string;
    select: any;
    menuActive: string;
    filterCustomer: string[];
    filterSBU: string[];
    rev: number;
    reportFilter: any;
    privilege: any[];
    filter: MFilterSale[];
    filters: any;
}
const initialState: MRedux = {
    login: false,
    empcode: '',
    username: '',
    name: '',
    select: {
        year: '',
        month: ''
    },
    menuActive: 'home',
    filterCustomer: [],
    filterSBU: [],
    rev: 0,
    reportFilter: {
        customer: [],
        modelGroup: [],
        model: [],
        sebango: [],
        pltype: []
    },
    privilege: [],
    filter: [
        { text: 'MM/YYYY', sort: '', type: 'select', value: [] },
        { text: 'CUSTOMER', sort: '', type: 'select', value: [] },
        { text: 'MODEL CODE', sort: '', type: 'select', value: [] },
        { text: 'MODEL NAME', sort: '', type: 'select', value: [] },
        { text: 'DIAMETER', sort: '', type: 'select', value: [] },
        { text: 'PLTYPE', sort: '', type: 'select', value: [] }
    ],
    filters: {
        y: '',
        m: '',
        d: '',
        ymd: '',
        ym: ''
    }
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_FILTER_SALE_PAGE':
            return {
                ...state,
                filters: { ...state.filters, y: action.payload.y }
            }
        case 'SET_SORT':
            let text: string = action.payload.text;
            let sort: string = action.payload.sort;
            let indexFilter: number = state.filter.findIndex(x => x.text == text);
            if (indexFilter != -1) {
                state.filter[indexFilter].sort = sort;
            }
            return {
                ...state
            }
        case 'LOGIN':
            return {
                ...state,
                login: true,
                empcode: action.payload.empcode,
                name: action.payload.name,
                rev: action.payload.rev,
                dvcd: action.payload.dvcd
            }
        case 'SET_REV':
            return {
                ...state,
                login: false,
                rev: action.payload
            }
        case 'LOGOUT':
            // return {
            //     ...state,
            //     login: false,
            //     filterCustomer: [],
            //     filterSBU: []
            // }
            return {
                ...initialState
            }
        case 'EDIT-INIT':
            return {
                ...state,
                select: {
                    year: action.payload.year,
                    month: action.payload.month,
                    distribution: action.payload.distribution
                }
            }
        case 'SET-MENU':
            return {
                ...state,
                menuActive: action.payload
            }
        case 'SET_FILTER_CUSTOMER':
            return {
                ...state,
                // filterCustomer: [...state.filterCustomer,...action.payload]
                filterCustomer: action.payload
            }
        case 'SET_FILTER_SBU':
            return {
                ...state,
                filterSBU: action.payload
            }
        case 'SET_FILTER_REPORT':
            return {
                ...state,
                reportFilter: action.payload
            }
        // case 'CLEAR_FILTER':
        //     return {
        //         ...state,
        //         reportFilter: {
        //             customer: [],
        //             modelGroup: [],
        //             model: [],
        //             sebango: [],
        //             pltype: []
        //         }
        //     }
        case 'SET_VERSION':
            return {
                ...state,
                rev: action.payload
            }
        case 'RESET':
            return initialState
        case 'SET_PRIVILEGE':
            return {
                ...state,
                privilege: action.payload
            }
        case 'SET_FILTER':
            // let payload = action.payload;
            // let choose: string = action.payload.choose;
            // let filter = state.filter;
            // let index: number = filter.findIndex(x => x.text == payload.text);
            // if (index != -1) {
            //     if (filter[index].value.findIndex(o => o == choose) == -1) {
            //         filter[index].value.push(choose);
            //     } else {
            //         filter[index].value.splice(filter[index].value.findIndex(o => o == choose), 1);
            //     }
            //     filter[index].value = [...new Set(filter[index].value)];
            // }
            // return {
            //     ...state,
            //     filter: filter
            // }
            let payload = action.payload;
            let column: string = payload.column; // column
            let value: string[] = payload.value; // value []
            let filter = state.filter;
            let index: number = filter.findIndex(x => x.text == column);
            filter[index].value = value;
            return {
                ...state,
                filter: filter
            }
        case 'CLEAR_FILTER':
            state.filter.map(o => o.value = []);
            console.log(state)
            return {
                ...state
            }
        default:
            return state
    }
}
// const initialStateFilter: MReduxSale = {
//     filter: [
//         { text: 'MM/YYYY', sort: '', type: 'select', value: [] },
//         { text: 'CUSTOMER', sort: '', type: 'select', value: [] },
//         { text: 'MODEL', sort: '', type: 'select', value: [] },
//         { text: 'DIAMETER', sort: '', type: 'select', value: [] },
//         { text: 'PLTYPE', sort: '', type: 'select', value: [] }
//     ],
// login: false,
// empcode: '',
// username: '',
// name: '',
// select: {
//     year: '',
//     month: ''
// },
// menuActive: 'home',
// filterCustomer: [],
// filterSBU: [],
// rev: 0,
// reportFilter: {
//     customer: [],
//     modelGroup: [],
//     model: [],
//     sebango: [],
//     pltype: []
// },
// privilege: []
// }
// const ReducerFilter = (state = initialStateFilter, action: any) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             let payload = action.payload;
//             let choose = action.payload.choose;
//             let filter = state.filter;
//             let index: number = filter.findIndex(x => x.text == payload.text);
//             if (index != -1) {
//                 if (filter[index].value.findIndex(o => o == choose) == -1) {
//                     filter[index].value.push(choose);
//                 } else {
//                     filter[index].value.splice(filter[index].value.findIndex(o => o == choose), 1);
//                 }
//                 filter[index].value = [...new Set(filter[index].value)];
//             }
//             return {
//                 ...state,
//                 filter: filter
//             }
//         case 'LOGIN':
//             return {
//                 ...state,
//                 login: true,
//                 empcode: action.payload.empcode,
//                 name: action.payload.name,
//                 rev: action.payload.rev,
//                 dvcd: action.payload.dvcd
//             }
//         case 'SET_REV':
//             return {
//                 ...state,
//                 login: false,
//                 rev: action.payload
//             }
//         case 'LOGOUT':
//             // return {
//             //     ...state,
//             //     login: false,
//             //     filterCustomer: [],
//             //     filterSBU: []
//             // }
//             return {
//                 ...initialState
//             }
//         case 'EDIT-INIT':
//             return {
//                 ...state,
//                 select: {
//                     year: action.payload.year,
//                     month: action.payload.month,
//                     distribution: action.payload.distribution
//                 }
//             }
//         case 'SET-MENU':
//             return {
//                 ...state,
//                 menuActive: action.payload
//             }
//         case 'SET_FILTER_CUSTOMER':
//             return {
//                 ...state,
//                 // filterCustomer: [...state.filterCustomer,...action.payload]
//                 filterCustomer: action.payload
//             }
//         case 'SET_FILTER_SBU':
//             return {
//                 ...state,
//                 filterSBU: action.payload
//             }
//         case 'SET_FILTER_REPORT':
//             return {
//                 ...state,
//                 reportFilter: action.payload
//             }
//         case 'CLEAR_FILTER':
//             return {
//                 ...state,
//                 reportFilter: {
//                     customer: [],
//                     modelGroup: [],
//                     model: [],
//                     sebango: [],
//                     pltype: []
//                 }
//             }
//         case 'SET_VERSION':
//             return {
//                 ...state,
//                 rev: action.payload
//             }
//         case 'RESET':
//             return initialState
//         case 'SET_PRIVILEGE':
//             return {
//                 ...state,
//                 privilege: action.payload
//             }
//         default:
//             return state
//     }
// }
// export default { IndexReducer, ReducerFilter };
export default IndexReducer;
