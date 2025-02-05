import { useState, useEffect } from 'react'
import { appHeaderSvgs } from './Svgs'
import { useParams } from 'react-router-dom' // 
import {loadGigs } from '../store/actions/gig.actions' // loadgigs



export function GigFilter({ user, filterBy, setFilterBy }) {
    const { gigTag } = useParams()

    const [filterToEdit, setFilterToEdit] = useState(structuredClone(filterBy))
    const [inputWidth, setInputWidth] = useState('25em')

    useEffect(() => {
        handleWidth();
    }, [user]);

    useEffect(() => {
        setFilterBy(filterToEdit)
    }, [filterToEdit])

    const handleWidth = () => {
        setInputWidth(user ? '40em' : '23em');
    };

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
        <input
            style={{ width: inputWidth }}
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