

const initialState = {
    loading: false,
    data: [],
    error: ''
}

export const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCHING_USERS_DATA': return {
            ...state,
            loading: true
        }; 
        case 'FETCHED_USERS_DATA': return {
            loading: false,
            data: action.payLoad,
            error: ''
        };
        case 'FETCHING_USERS_ERROR': return {
            loading: false,
            data: [],
            error: action.payLoad
        };

        default: return state
    }
}