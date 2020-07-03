

const initialState = {
    loading:false,
    data: [],
    error: ''
}

export const projectReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCHING_PROJECT_DATA': return {
            ...state,
            loading: true
        }; 
        case 'FETCHED_PROJECT_DATA': return {
            loading: false,
            data: action.payLoad,
            error: ''
        };
        case 'FETCHING_PROJECT_ERROR': return {
            loading: false,
            data: [],
            error: action.payLoad
        };

        default: return state;
    }
}