export const ADD_REQUESTED = 'ADD_REQUESTED';
export function requestAdd() {
    return {
        type: ADD_REQUESTED
    };
}

export const REQUESTED_ADD_SUCCEEDED = 'REQUESTED_ADD_SUCCEEDED';
export function addSucceeded() {
    return {
        type: REQUESTED_ADD_SUCCEEDED
    };
}