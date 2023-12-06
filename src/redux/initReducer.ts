const initialState = {
    login: false,
    username: '',
    select: {
        year: '',
        month: ''
    }
}

const IndexReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload)
            return {
                ...state,
                ...action.payload
            }
        case 'EDIT-INIT':
            return {
                ...state,
                select: {
                    year: action.payload.year,
                    month: action.payload.month
                }
            }
        default:
            return state
    }
}
export default IndexReducer;
