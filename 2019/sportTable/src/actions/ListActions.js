import {
    RESULTS_LOADED,
    GENERAL_RESET
} from './types';

// import Cookies from 'js-cookie';

export const loadResults = () => {
    const data = { ...require('../assets/wellness.json') };
    return {
        type: RESULTS_LOADED,
        payload: data
    };
};

export const resetResults = () => {
    return {
        type: GENERAL_RESET
    };
}