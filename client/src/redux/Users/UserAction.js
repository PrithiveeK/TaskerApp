export function fetchUsersData() {
    return {
        type: 'FETCHING_USERS_DATA'
    }
}

export function fetchedUsersData(payLoad) {
    return {
        type: 'FETCHED_USERS_DATA',
        payLoad
    }
}

export function usersDataError(payLoad) {
    return {
        type: 'FETCHING_USERS_ERROR',
        payLoad
    }
}

export function fetchAllUsers() {
    return (dispatch) => {
        dispatch(fetchUsersData());
        fetch("http://localhost:5000/api/user/all",{
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then(data=>{
            dispatch(fetchedUsersData(data || []))
        }).catch(err=>{
            dispatch(usersDataError("Sorry, something went wrong!"))
        })
    }
}