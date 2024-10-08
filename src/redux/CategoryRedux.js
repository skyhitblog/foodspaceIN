import WooWorker from '../services/WooWorker';
import {warn} from "@app/Omni"


const types = {
    FETCH_CATEGORIES_PENDING: 'FETCH_CATEGORIES_PENDING',
    FETCH_CATEGORIES_SUCCESS: 'FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILURE: 'FETCH_CATEGORIES_FAILURE',

    SWITCH_DISPLAY_MODE: 'SWITCH_DISPLAY_MODE',
    SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
};

export const DisplayMode = {
    ListMode: 'ListMode',
    GridMode: 'GridMode',
    CardMode: 'CardMode'
};

export const actions = {
    fetchCategories: async(dispatch) => {
        dispatch({type: types.FETCH_CATEGORIES_PENDING});
        const json = await WooWorker.getCategories();

        if (json === undefined) {
            dispatch(actions.fetchCategoriesFailure('Can\'t get data from server'));
        } else if (json.code) {
            dispatch(actions.fetchCategoriesFailure(json.message));
        } else {
            dispatch(actions.fetchCategoriesSuccess(json));
        }
    },
    fetchCategoriesSuccess: (items) => {
        return {type: types.FETCH_CATEGORIES_SUCCESS, items};
    },
    fetchCategoriesFailure: (error) => {
        return {type: types.FETCH_CATEGORIES_FAILURE, error};
    },
    switchDisplayMode: (mode) => {
        return {type: types.SWITCH_DISPLAY_MODE, mode};
    },
    setSelectedCategory: (category) => {
        return {type: types.SET_SELECTED_CATEGORY, category};
    },
};

const initialState = {
    isFetching: false,
    error: null,
    displayMode: DisplayMode.GridMode,
    list: [],
    selectedCategory: null,
};

export const reducer = (state = initialState, action) => {
    const {type, mode, error, items, category} = action;

    switch (type) {
        case types.FETCH_CATEGORIES_PENDING: {
            return {
                ...state,
                isFetching: true,
                error: null
            };
        }
        case types.FETCH_CATEGORIES_SUCCESS: {
            return {
                ...state,
                isFetching: false,
                list: items || [],
                error: null
            };
        }
        case types.FETCH_CATEGORIES_FAILURE: {
            return {
                ...state,
                isFetching: false,
                list: [],
                error: error
            };
        }
        case types.SWITCH_DISPLAY_MODE: {
            return {
                ...state,
                displayMode: mode,
            };
        }
        case types.SET_SELECTED_CATEGORY: {
            return {
                ...state,
                selectedCategory: category,
            };
        }
        default: {
            return state;
        }
    }
};
