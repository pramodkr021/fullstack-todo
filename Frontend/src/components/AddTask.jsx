import React, { useState } from 'react'
import { MdAssignmentAdd } from 'react-icons/md'

export const AddTask = (props) => {
    const [input, setInput] = useState("")

    function handleInput(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!input.trim()) return
        props.submit(input)
        setInput("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <input type="text" placeholder='Add Task' value={input} name="task" onChange={handleInput} />
                <button type="submit"><MdAssignmentAdd className='add md-common'/></button>
            </div>
        </form>
    )
}
