import { gigService } from "../../services/gig/gig.service.remote";

const initialState = {
    filterBy: gigService.defaultFilter()
};

export const filterReducer = (state = initialState, action) => {
    console.log('STORE:');
    
    console.log('action:', action);
    
    switch (action.type) {
        case 'SET_FILTER':
            return { 
                ...state,
                filterBy: {...state.filterBy, ...action.filterBy},
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
