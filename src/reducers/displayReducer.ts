import { ActionObject } from '../types'
import { DisplayState } from '../types'
import { Reducer } from 'redux'

const initialState: DisplayState = {
    myAppsDisplay: "Home",
    displayWebchat: false,
    displayLogin: true,
    displayError: null
};

const displayReducer: Reducer<DisplayState> =  (state = initialState, action: ActionObject) => {
    switch(action.type) {
        case 'SET_BLIS_APP_DISPLAY':
            return {...state, myAppsDisplay: action.setDisplay};
        case 'SET_WEBCHAT_DISPLAY':
            return {...state, displayWebchat: action.setWebchatDisplay};
        case 'SET_LOGIN_DISPLAY':
            return {...state, displayLogin: action.setLoginDisplay};
        case 'SET_ERROR_DISPLAY':
            return {...state, displayError: action.setErrorDisplay};
        case 'CREATE_BLIS_APPLICATION_FULFILLED':
            return {...state, myAppsDisplay: "TrainingGround"};
        default:
            return state;
    }
}
export default displayReducer;