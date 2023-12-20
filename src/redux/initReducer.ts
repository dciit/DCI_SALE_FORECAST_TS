const initialState = {
    login: false,
    empcode: '',
    username: '',
    name: '',
    select: {
        year: '',
        month: ''
    },
    menuActive: 'home'
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                login: true,
                empcode: action.payload.empcode,
                name: action.payload.name
            }
        case 'LOGOUT':
            return {
                ...state,
                login: false
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
        default:
            return state
    }
}
export default IndexReducer;
