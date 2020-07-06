export function fetchTaskData() {
    return {
        type: 'FETCHING_TASKS_DATA'
    }
}

export function fetchedTaskData(payLoad) {
    return {
        type: 'FETCHED_TASKS_DATA',
        payLoad
    }
}

export function taskDataError(payLoad) {
    return {
        type: 'FETCHING_TASKS_ERROR',
        payLoad
    }
}

export function fetchAllTasks(){
    return (dispatch) => {
        dispatch(fetchTaskData())
        fetch("http://localhost:5000/api/task/all",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(data=>{
            dispatch(fetchedTaskData(data || []))
        }).catch(err=>{
            dispatch(taskDataError("Sorry, Something went wrong!"))
        })
    }
}