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