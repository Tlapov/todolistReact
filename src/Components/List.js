import React from 'react'
import requestApi from './requestApi'
import { FaTrash } from 'react-icons/fa'

const List = ({name, setname, length, api, setshowError}) => {
  const checkMove = async (id) => {
    const newCheck = name.map(n => n.id === id ? {...n, checked: !n.checked} : n);
    setname(newCheck)
    const nameFilter = newCheck.filter(n => n.id === id)
    const option = {
      method: "PATCH",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: nameFilter[0].checked}) 
    }
    const apiUrl = `${api}/${id}`;
    const result = await requestApi(apiUrl, option)
    if(result){setshowError(result)}
  }
  const deleteItem = async (id) => {
    const newItem = name.filter(n => n.id !== id)
    setname(newItem)
    const option = {
      method: "DELETE",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem) 
    }
    const apiUrl = `${api}/${id}`;
    const result = await requestApi(apiUrl, option)
    if(result){setshowError(result)}
  }

  return (
    <ul>
      {length ? (
        name.map(n => 
            <li key={n.id}>
                <input 
                type="checkbox" 
                id="check" 
                onChange={()=> checkMove(n.id)}
                checked={n.checked}  
                />
                <label htmlFor="check">{n.label}</label>
                <small><FaTrash onClick={() => deleteItem(n.id)}></FaTrash></small>
            </li>
        )
      ):(
        <p>Lista je prazna</p>
      )}
    </ul>
  )
}

export default List