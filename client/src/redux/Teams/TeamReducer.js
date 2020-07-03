

const initialState = {
    loading: false,
    data: [],
    error: ''
}

export const teamReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCHING_TEAM_DATA': return {
            ...state,
            loading: true
        }; 
        case 'FETCHED_TEAM_DATA': return {
            loading: false,
            data: action.payLoad,
            error: ''
        };
        case 'FETCHING_TEAM_ERROR': return {
            loading: false,
            data: [],
            error: action.payLoad
        };

        default: return state
    }
}