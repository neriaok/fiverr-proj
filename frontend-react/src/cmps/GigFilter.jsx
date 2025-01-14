import { useState, useEffect } from 'react'
import { appHeaderSvgs } from './Svgs'

export function GigFilter({ filterBy, setFilterBy }) {
    const [ filterToEdit, setFilterToEdit ] = useState(structuredClone(filterBy))

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
                if(!filterToEdit.sortDir) filterToEdit.sortDir = 1
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
            <input
            className='filter-input'
                type="text"
                name="txt"
                value={filterToEdit.txt}
                placeholder="What service are you looking for today?"
                onChange={handleChange}
                required
            />
            <div className='search-svg'>
            {appHeaderSvgs.magnifyingGlass}
            </div>

    </section>
}