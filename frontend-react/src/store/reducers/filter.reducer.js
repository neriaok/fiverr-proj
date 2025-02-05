const initialState = {
    filterBy: {
        txt: '',
        price: '',
        tag: '',
        deliveryTime: '',
    }
};

export const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.filterBy,
            };
        case 'CLEAR_FILTER':
            return {
                ...state,
                filterBy: initialState.filterBy,
            };
        default:
            return state;
    }
};
