import { 
    SET_TOTAL_APPLICATION,
    SET_TOTAL_FUND_RAISED,
    SET_APPLICATION_LIST,
    SET_CONTRACT_INSTANCE
} from './actionTypes';

const initialState = {
    isLoading: false,
    isError: false,
    totalFundRaised: 0,
    totalApplication: 0,
    applicationList: [],
    crowdy: {}
}

const reducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case SET_TOTAL_FUND_RAISED:
            return {
                ...state,
                totalFundRaised: payload
            }
        case SET_TOTAL_APPLICATION:
            return {
                ...state,
                totalApplication: payload
            }
        case SET_APPLICATION_LIST:
            return {
                ...state,
                applicationList: payload
            }
        case SET_CONTRACT_INSTANCE:
            return {
                ...state,
                crowdy: payload
            }
        default:
            return state
    }
}

export {reducer}