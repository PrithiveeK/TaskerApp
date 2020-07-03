

const initialState = {
    loading:false,
    data: [],
    error: ''
}

export const tasksReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCHING_TASKS_DATA': return {
            ...state,
            loading: true
        }; 
        case 'FETCHED_TASKS_DATA': return {
            loading: false,
            data: action.payLoad,
            error: ''
        };
        case 'FETCHING_TASKS_ERROR': return {
            loading: false,
            data: [],
            error: action.payLoad
        };

        default: return state;
    }
}