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