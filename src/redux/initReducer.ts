const initialState = {
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
    privilege: []
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                empcode: action.payload.empcode,
                name: action.payload.name,
                rev: action.payload.rev,
                dvcd:action.payload.dvcd
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
        case 'CLEAR_FILTER':
            return {
                ...state,
                reportFilter: {
                    customer: [],
                    modelGroup: [],
                    model: [],
                    sebango: [],
                    pltype: []
                }
            }
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
        default:
            return state
    }
}
export default IndexReducer;
