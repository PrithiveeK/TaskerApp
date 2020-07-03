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