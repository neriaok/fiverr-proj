import { gigService } from "../../services/gig/gig.service.remote";
import { store } from "../store";

// export const setFilter = (filterBy) => ({
//     type: 'SET_FILTER',
//     filterBy
// });

export function setFilter(filterBy = gigService.defaultFilter()) {
    console.log('on Set filter');
    
    store.dispatch({
        type:  'SET_FILTER',
        filterBy
})
}

export const clearFilter = () => ({
    type: 'CLEAR_FILTER',
});
