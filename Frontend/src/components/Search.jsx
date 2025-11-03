import { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { getAllTask } from '../api';

const Search = ({ onSearch }) => {

    const [searchTask, setSearchTask] = useState("")

    function handleSearch(keyword) {
        getAllTask(keyword).then((response) => {
            onSearch(response.data.data)
            setSearchTask("")
        })
    }

    return (
        <div className='container'>
            <input type="text" placeholder='Search Task' value={searchTask} onChange={(e) => setSearchTask(e.target.value)} title='searchValue' />
            <LuSearch className='md-common search' onClick={() => handleSearch(searchTask)} title='search' />
        </div>
    )
}

export default Search