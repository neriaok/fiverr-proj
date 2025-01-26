import { useState, useEffect } from 'react';
import { filterBarSvgs } from './Svgs';

export function FilterBar({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy));
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false);
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false);

    const toggleBudgetMenu = () => {
        setIsBudgetMenuOpen(prevState => !prevState);
        setIsDeliveryMenuOpen(false); // Close delivery menu if it's open
    };

    const toggleDeliveryMenu = () => {
        setIsDeliveryMenuOpen(prevState => !prevState);
        setIsBudgetMenuOpen(false); // Close the budget menu if it's open
    };

    useEffect(() => {
        setFilterBy(filterToEdit);  // Update the parent state with the selected filters
    }, [filterToEdit, setFilterBy]);

    function handleChange(ev) {
        const type = ev.target.type;
        const field = ev.target.name;
        let value;

        // Handle changes based on the type of input
        switch (type) {
            case 'radio':
                value = ev.target.value;
                break;
            default:
                value = ev.target.value;
        }

        // Update the state with the new filter
        setFilterToEdit({ ...filterToEdit, [field]: value });
    }

    function clearFilter() {
        setFilterToEdit({
            txt: '',
            price: '', // Reset price to be blank
            tag: '', // Reset tag to be blank
            deliveryTime: '', // Reset deliveryTime to be blank
        });
    }

    function clearSort() {
        setFilterToEdit({
            ...filterToEdit,
            sortField: '',
            sortDir: 1, // Reset to default direction
        });
    }

    // Function to display selected filters
    function displaySelectedFilters() {
        const selectedFilters = [];

        if (filterToEdit.price) {
            selectedFilters.push(`Price: ${filterToEdit.price}`);
        }
        if (filterToEdit.deliveryTime) {
            selectedFilters.push(`Delivery time: ${filterToEdit.deliveryTime}`);
        }
        if (filterToEdit.txt) {
            selectedFilters.push(`Search text: ${filterToEdit.txt}`);
        }
        if (filterToEdit.tag) {
            selectedFilters.push(`Tag: ${filterToEdit.tag}`);
        }

        return selectedFilters.length ? selectedFilters.join(' | ') : 'No filters selected';
    }

    return (
        <section className="gig-filterbar">
            <div className="label-bar">
                <label onClick={toggleBudgetMenu}>Budget {filterBarSvgs.arrowDown}</label>
                <label onClick={toggleDeliveryMenu}>Delivery time {filterBarSvgs.arrowDown}</label>
            </div>

            <div className="sort-field">
                {/* Budget filter menu */}
                {isBudgetMenuOpen && (
                    <div className="sort-budget">
                        <label>
                            <input
                                type="radio"
                                name="price" // Use 'price' for Budget filter
                                value="value"
                                checked={filterToEdit.price === 'value'}
                                onChange={handleChange}
                            />
                            <span>Value</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="price" // Same 'price' for Budget filter
                                value="mid-range"
                                checked={filterToEdit.price === 'mid-range'}
                                onChange={handleChange}
                            />
                            <span>Mid-range</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="price" // Same 'price' for Budget filter
                                value="high-end"
                                checked={filterToEdit.price === 'high-end'}
                                onChange={handleChange}
                            />
                            <span>High-end</span>
                        </label>
                    </div>
                )}

                {/* Delivery filter menu */}
                {isDeliveryMenuOpen && (
                    <div className="sort-delivery">
                        <label>
                            <input
                                type="radio"
                                name="deliveryTime" // Use 'deliveryTime' for Delivery filter
                                value="up-to-3"
                                checked={filterToEdit.deliveryTime === 'up-to-3'}
                                onChange={handleChange}
                            />
                            <span>Up to 3 days</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="deliveryTime" // Same 'deliveryTime' for Delivery filter
                                value="up-to-7"
                                checked={filterToEdit.deliveryTime === 'up-to-7'}
                                onChange={handleChange}
                            />
                            <span>Up to 7 days</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="deliveryTime" // Same 'deliveryTime' for Delivery filter
                                value="anytime"
                                checked={filterToEdit.deliveryTime === 'anytime'}
                                onChange={handleChange}
                            />
                            <span>Anytime</span>
                        </label>
                    </div>
                )}
            </div>

            <div className="selected-filters">
                <h4>Selected Filters</h4>
                <p>{displaySelectedFilters()}</p>
            </div>

            <button className="btn-clear" onClick={clearFilter}>
                Clear All Filters
            </button>
            <button className="btn-clear" onClick={clearSort}>
                Clear Sort
            </button>
        </section>
    );
}
