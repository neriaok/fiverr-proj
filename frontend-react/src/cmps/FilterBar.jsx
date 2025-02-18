import { useState, useEffect, useRef, React } from 'react';
import { filterBarSvgs } from './Svgs';

export function FilterBar({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState({ ...filterBy });
    const [activeFilters, setActiveFilters] = useState({}); 
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false);
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false);

    useEffect(() => {
        setFilterBy(filterToEdit); // Update the parent state with the selected filters
    }, [filterToEdit]);

    const toggleBudgetMenu = () => {
        setIsBudgetMenuOpen(prevState => !prevState);
        setIsDeliveryMenuOpen(false);
    };

    const toggleDeliveryMenu = () => {
        setIsDeliveryMenuOpen(prevState => !prevState);
        setIsBudgetMenuOpen(false);
    };

    function handleChange(ev) {
        const type = ev.target.type;
        const field = ev.target.name;
        let value;

        switch (type) {
            case 'radio':
                value = ev.target.value;
                break;
            default:
                value = ev.target.value;
        }

        // Storing the data-variable instead of the value
        const variable = ev.target.dataset.variable;

        setFilterToEdit({ ...filterToEdit, [field]: value });

        // Update active filters with the data-variable for display
        setActiveFilters(prevFilters => ({
            ...prevFilters,
            [field]: variable, // Store the data-variable value
        }));
    }

    function removeFilter(field) {
        const newActiveFilters = { ...activeFilters };
        delete newActiveFilters[field]; // Remove the filter chip by its field name

        setActiveFilters(newActiveFilters);

        // Reset the corresponding filter value in state
        setFilterToEdit({ ...filterToEdit, [field]: '' });
    }

    function clearFilter() {
        setFilterToEdit({
            txt: '',
            price: '',
            tag: '',
            deliveryTime: '',
        });
        setActiveFilters({});
    }

    function clearSort() {
        setFilterToEdit({
            ...filterToEdit,
            sortField: '',
            sortDir: 1,
        });
    }

    return (
        <>
            <section className="gig-filterbar main-container full">
                <div className="label-bar">
                    <label onClick={toggleBudgetMenu}>Budget {filterBarSvgs.arrowDown}</label>
                    <label onClick={toggleDeliveryMenu}>Delivery time {filterBarSvgs.arrowDown}</label>
                </div>

                <div className="sort-field">
                    {isBudgetMenuOpen && (
                        <div className="sort-budget">
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    value="value"
                                    checked={filterToEdit.price === 'value'}
                                    onChange={handleChange}
                                    data-variable="Under ₪495"
                                />
                                <span>Value <span className="gray"> &nbsp; Under ₪495</span></span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    value="mid-range"
                                    checked={filterToEdit.price === 'mid-range'}
                                    onChange={handleChange}
                                    data-variable="₪495 - ₪1332"
                                />
                                <span>Mid-range <span className="gray"> &nbsp; ₪495 - ₪1332</span></span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    value="high-end"
                                    checked={filterToEdit.price === 'high-end'}
                                    onChange={handleChange}
                                    data-variable="₪1332 & Above"
                                />
                                <span>High-end <span className="gray"> &nbsp; ₪1332 & Above</span></span>
                            </label>
                        </div>
                    )}

                    {isDeliveryMenuOpen && (
                        <div className="sort-delivery">
                            <label>
                                <input
                                    type="radio"
                                    name="deliveryTime"
                                    data-variable="Up to 3 days"
                                    value="3"
                                    checked={filterToEdit.deliveryTime === '3'}
                                    onChange={handleChange}
                                />
                                <span>Up to 3 days</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="deliveryTime"
                                    data-variable="Up to 7 days"
                                    value="7"
                                    checked={filterToEdit.deliveryTime === '7'}
                                    onChange={handleChange}
                                />
                                <span>Up to 7 days</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="deliveryTime"
                                    data-variable="Anytime"
                                    value="0"
                                    checked={filterToEdit.deliveryTime === '0'}
                                    onChange={handleChange}
                                />
                                <span>Anytime</span>
                            </label>
                        </div>
                    )}
                </div>
            </section>

            <div className="active-filters">
                {!Object.entries(activeFilters).length ? <div style={{ height: '2em' }}></div> : ''}
                {Object.entries(activeFilters).map(([field, filterVariable]) => (
                    <div className="filter-chip" key={field}>
                        <span>{filterVariable}</span> {/* Display the data-variable */}
                        <button className="clear-btn" onClick={() => removeFilter(field)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
