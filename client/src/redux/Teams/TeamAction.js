export function fetchTeamData() {
    return {
        type: 'FETCHING_TEAM_DATA'
    }
}

export function fetchedTeamData(payLoad) {
    return {
        type: 'FETCHED_TEAM_DATA',
        payLoad
    }
}

export function teamDataError(payLoad) {
    return {
        type: 'FETCHING_TEAM_ERROR',
        payLoad
    }
}