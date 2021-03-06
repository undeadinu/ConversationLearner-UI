/**
 * Copyright (c) Microsoft Corporation. All rights reserved.  
 * Licensed under the MIT License.
 */
import { ActionObject, ErrorState } from '../types'
import { ErrorType } from '../types/const'
import { Reducer } from 'redux'
import { AT } from '../types/ActionTypes'

const initialState: ErrorState = {
    type: ErrorType.Error,
    title: null,
    message: "",
    actionType: AT.NO_OP,
    closeCallback: null
}

const errorReducer: Reducer<ErrorState> = (state = initialState, action: ActionObject): ErrorState => {
    switch (action.type) {
        case AT.CLEAR_ERROR_DISPLAY:
            return { ...initialState }
        case AT.SET_ERROR_DISPLAY:
            return { 
                ...state,
                type: action.errorType,
                title: action.title,
                message: action.message,
                actionType: action.actionType,
            }
        case AT.SET_ERROR_DISMISS_CALLBACK:
            return {...state, closeCallback: action.closeCallback}
        case AT.FETCH_BOTINFO_FULFILLED:
            if (action.botInfo.validationError) {
                return {
                    type: ErrorType.Error,
                    title: `Configuration Error`,
                    message: action.botInfo.validationError,
                    actionType: AT.FETCH_BOTINFO_ASYNC,
                    closeCallback: null
                }
            }
            return { ...state }
        default:
            return state;
    }
}

export default errorReducer;