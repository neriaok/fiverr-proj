import { useState, useEffect } from 'react'

export function FilterBar({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy));
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false);
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false);

    const toggleBudgetMenu = () => setIsBudgetMenuOpen(prevState => !prevState);
    const toggleDeliveryMenu = () => setIsDeliveryMenuOpen(prevState => !prevState);

    useEffect(() => {
        setFilterBy(filterToEdit);
    }, [filterToEdit]);

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

        setFilterToEdit({ ...filterToEdit, [field]: value });
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', price: '', tag: '', deliveryTime: '' });
    }

    return (
        <section className="gig-filter">
            <div className="label-bar">
                <label onClick={toggleBudgetMenu}>Budget</label>
                <label onClick={toggleDeliveryMenu}>Delivery time</label>
            </div>

            <div className="sort-field">
                {isBudgetMenuOpen && (
                    <div className="sort-budget">
                        <label>
                            <span>Value</span>
                            <input
                                type="radio"
                                name="price"
                                value="value"
                                checked={filterToEdit.price === 'value'}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span>Mid-range</span>
                            <input
                                type="radio"
                                name="price"
                                value="mid-range"
                                checked={filterToEdit.price === 'mid-range'}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span>High-end</span>
                            <input
                                type="radio"
                                name="price"
                                value="high-end"
                                checked={filterToEdit.price === 'high-end'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                )}

                {isDeliveryMenuOpen && (
                    <div className="sort-delivery">
                        <label>
                            <span>Up to 3 days</span>
                            <input
                                type="radio"
                                name="deliveryTime"
                                value="up-to-3"
                                checked={filterToEdit.deliveryTime === 'up-to-3'}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span>Up to 7 days</span>
                            <input
                                type="radio"
                                name="deliveryTime"
                                value="up-to-7"
                                checked={filterToEdit.deliveryTime === 'up-to-7'}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span>Anytime</span>
                            <input
                                type="radio"
                                name="deliveryTime"
                                value="anytime"
                                checked={filterToEdit.deliveryTime === 'anytime'}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                )}
            </div>

            <button className="btn-clear" onClick={clearFilter}>Clear Filters</button>
        </section>
    );
}
