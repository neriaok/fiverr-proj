import { useState, useEffect } from 'react'
import { appHeaderSvgs } from './Svgs'

export function FilterBar({ user, filterBy, setFilterBy }) {
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

        {isMenuOpen && (
                <label>
                    <span>Speed</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="speed"
                        checked={filterToEdit.sortField === 'speed'}
                        onChange={handleChange}
                    />
                </label>
                )}

                <label>
                    <span>Vendor</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="vendor"
                        checked={filterToEdit.sortField === 'vendor'}            
                        onChange={handleChange}
                    />
                </label>
                
                <label>
                    <span>Owner</span>
                    <input
                        type="radio"
                        name="sortField"
                        value="owner"
                        checked={filterToEdit.sortField === 'owner'}                        
                        onChange={handleChange}
                    />
                </label>
                
            </div>
            <div className="sort-dir">
                <label>
                    <span>Asce</span>
                    <input
                        type="radio"
                        name="sortDir"
                        value="1"
                        checked={filterToEdit.sortDir === 1}                        
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span>Desc</span>
                    <input
                        type="radio"
                        name="sortDir"
                        value="-1"
                        onChange={handleChange}
                        checked={filterToEdit.sortDir === -1}                        
                    />
                </label>
            </div>
            <button 
                className="btn-clear" 
                onClick={clearSort}>Clear</button>
                
    </section>

}