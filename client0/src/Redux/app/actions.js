import { 
    SET_TOTAL_FUND_RAISED,
    SET_TOTAL_APPLICATION,
    SET_APPLICATION_LIST,
    SET_CONTRACT_INSTANCE
} from './actionTypes';

const setTotalFundRaised = (payload) => {
    return {
        type: SET_TOTAL_FUND_RAISED,
        payload
    }
}

const setTotalApplication = (payload) => {
    return {
        type: SET_TOTAL_APPLICATION,
        payload
    }
}

const setApplicationList = (payload) => {
    return {
        type: SET_APPLICATION_LIST,
        payload
    }
}

const setContractInstance = (payload) => {
    return {
        type: SET_CONTRACT_INSTANCE,
        payload
    }
}


export { 
    setTotalFundRaised,
    setTotalApplication,
    setApplicationList,
    setContractInstance
}