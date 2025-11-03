import axios from "axios";

const API_BASE = "https://to-do-backend-fx4k.onrender.com"

export const getAllTask = (search = "") => {
    const url = search 
    ? `${API_BASE}/tasks?search=${search}` 
    : `${API_BASE}/tasks`

    return axios.get(url)
}

export const addTask = (task) => {
    return axios.post(`${API_BASE}/tasks/`, { task })
}

export const deleteTask = (taskId) => {
    return axios.delete(`${API_BASE}/tasks/delete/${taskId}`)
}

export const updateTask = (taskId, updatedTask) => {
    return axios.put(`${API_BASE}/tasks/update/${taskId}`, { task: updatedTask })
}

export const completeTask = (taskId) => {
    return axios.patch(`${API_BASE}/tasks/toggle/${taskId}`)
}