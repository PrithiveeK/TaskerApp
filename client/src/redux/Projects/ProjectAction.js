export function fetchProjectData() {
    return {
        type: 'FETCHING_PROJECT_DATA'
    }
}

export function fetchedProjectData(payLoad) {
    return {
        type: 'FETCHED_PROJECT_DATA',
        payLoad
    }
}

export function projectDataError(payLoad) {
    return {
        type: 'FETCHING_PROJECT_ERROR',
        payLoad
    }
}

export function fetchAllProject(){
    return (dispatch) => {
        dispatch(fetchProjectData())
        fetch("http://localhost:5000/api/project/all",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(data=>{
            dispatch(fetchedProjectData(data || []))
        }).catch(err=>{
            dispatch(projectDataError("Sorry, Something went wrong!"))
        })
    }
}