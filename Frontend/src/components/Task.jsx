import { MdCreate, MdDelete, MdCheck, MdClose } from "react-icons/md"
import { useState } from "react";

export const Task = ({ task, id, onUpdate, onDelete, status, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [newValue, setNewValue] = useState(task)

    function startEdit() {
        setIsEditing(true)
    }

    function cancelEdit() {
        setIsEditing(false)
        setNewValue(task)
    }

    function handleSave() {
        const trimmedValue = newValue.trim()
        if (!trimmedValue) return
        onUpdate(id, trimmedValue)
        setIsEditing(false)
    }

    return (
        <li className="task-item">
            <div className="task-content">
                {isEditing ? (
                    <input
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        autoFocus
                    />) :
                    <span
                        className={`task-text ${status ? "completed" : ""}`}
                        onClick={() => onToggle(id)}
                    >
                        {task}
                    </span>
                }

                <div className="task-actions">
                    {
                        isEditing ? (
                            <>
                                <MdCheck className="md-icon save" onClick={handleSave} title="Save" />
                                <MdClose className="md-icon cancel" onClick={cancelEdit} title="Cancel" />
                            </>
                        ) : (
                            <>
                                <MdCreate className="md-icon edit" onClick={startEdit} title="Edit" />
                                <MdDelete className="md-icon delete" onClick={() => onDelete(id)} title="Delete" />
                            </>
                        )
                    }
                </div>
            </div>
        </li>
    )
}
