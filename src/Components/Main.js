import React from 'react'
import List from './List'
import requestApi from "./requestApi"
import {FaPlus} from "react-icons/fa"


export const Main = ({length, api, name, setname, newname, setnewname, searchname, setsearchname, setshowError}) => { 
  const addItem = async () => {
    const id = name.length ? name[name.length -1].id + 1 : 1;
    const label = newname
    const addnewItem = {id, checked:false, label}
    const anotherNewItem = [...name, addnewItem]
    setname(anotherNewItem)
    setnewname("")
    
    const option = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addnewItem) 
    }
    const result = await requestApi(api, option)
    if(result){setshowError(result)}
  }   
  return (
    <>
        <header>
            <input 
                type="search"  
                placeholder='Pretraži svoju listu'
                value={searchname}
                onChange={(e) => setsearchname(e.target.value)}
            />
        </header>
        <section>      
            <h3>Moja shooping lista</h3>
            <div className="List">
                <div className="input-add">
                    <input 
                    type="text"
                    placeholder='Unesite listu'
                    value={newname}
                    onChange={(e) => setnewname(e.target.value)}    
                    />
                    <button><FaPlus onClick={() => addItem()}></FaPlus></button>
                </div>
                <List 
                    name = {name}
                    setname = {setname}
                    length = {length}
                    api = {api}
                    setshowError = {setshowError}
                ></List>
            </div>
        </section>
        <div className="footer">
            <p>U listi imate <b>{length}</b> proizvoda</p>
        </div>
    </>
  )
}
export default Main