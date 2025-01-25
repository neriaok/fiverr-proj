import { useState, useEffect } from 'react'

export function FilterBar({ filterBy, setFilterBy }) {
    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false);
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false);

    const toggleBudgetMenu = () => setIsBudgetMenuOpen(prevState => !prevState);
    const toggleDeliveryMenu = () => setIsDeliveryMenuOpen(prevState => !prevState);


    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])


    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterToEdit.sortDir) filterToEdit.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
        }
        setFilterToEdit({ ...filterToEdit, [field]: value })
    }

    function clearFilter() {
        setFilterToEdit({ ...filterToEdit, txt: '', price: '', maxPrice: '' })
    }

    function clearSort() {
        setFilterToEdit({ ...filterToEdit, sortField: '', sortDir: '' })
    }

    return <section className="gig-filter">
        <div className='label-bar'>
            <label onClick={toggleBudgetMenu}>Budget</label>
            <label onClick={toggleDeliveryMenu}>Delivery time</label>
        </div>

        <div className="sort-field">

            {isBudgetMenuOpen && (
                <div className='sort-budget'>
                    <label>
                        <span>Value</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="speed"
                            checked={filterToEdit.sortField === 'speed'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Mid-range</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="owner"
                            checked={filterToEdit.sortField === 'owner'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>High-end</span>
                        <input
                            type="radio"
                            name="sortDir"
                            value="-1"
                            onChange={handleChange}
                            checked={filterToEdit.sortDir === -1}
                        />
                    </label>
                </div>
            )}
            {isDeliveryMenuOpen && (
                <div className='sort-delivery'>
                    <label>
                        <span>Up to 3 days</span>
                        <input
                            type="radio"
                            name="sortField"
                            value="vendor"
                            checked={filterToEdit.sortField === 'vendor'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Up to 7 days</span>
                        <input
                            type="radio"
                            name="sortDir"
                            value="1"
                            checked={filterToEdit.sortDir === 1}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span>Anytime</span>
                        <input
                            type="radio"
                            name="sortDir"
                            value="1"
                            checked={filterToEdit.sortDir === 1}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            )}
        </div>
        <button
            className="btn-clear"
            onClick={clearSort}>Clear</button>

    </section>

}