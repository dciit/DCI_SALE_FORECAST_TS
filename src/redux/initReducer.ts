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
    rev: 0
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                empcode: action.payload.empcode,
                name: action.payload.name,
                rev: action.payload.rev
            }
        case 'SET_REV':
            return {
                ...state,
                login:false,
                rev: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                login: false,
                filterCustomer: [],
                filterSBU: []
            }
        case 'EDIT-INIT':
            return {
                ...state,
                select: {
                    year: action.payload.year,
                    month: action.payload.month
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
        default:
            return state
    }
}
export default IndexReducer;
