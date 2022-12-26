import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";

const Todo = () => {

  const getData = () => {
    let itemsData = JSON.parse(localStorage.getItem(`Todo's`));

    if (itemsData.length > 0) {
      return itemsData
    }
    else {
      return [];
    }
  }

  const [todo, setTodo] = useState("");
  const [items, setItems] = useState(getData());
  const [toggleupdate, setToggleupdate] = useState(false);
  const [updateobj, setUpdateobj] = useState("");
  const [newdata, setNewdata] = useState("");

  const additem = () => {
    if(newdata && toggleupdate){ 
      setItems(
        items.map((item) => { 
          if(item.id === updateobj){
            return {...item, name: newdata}
          }
          return item;
        })
      ) 
    }

    else if (todo) {
      const todoMsg = { id: new Date().getTime().toString(), name: todo };
      setItems([...items, todoMsg]);
      setTodo("");
    }
    else {
       alert("Please fill data.")  
    }
  }

  const deleteItem = (idx) => {
    const updateItems = items.filter((item) => {
      return item.id !== idx;
    })
    setItems(updateItems);
  }

  const updateItem = (id) => {
    setToggleupdate(true)
    setUpdateobj(id);
  }

  const handleSubmit = () => { 
     additem();
     setToggleupdate(false);
     console.log(newdata);
  }

  useEffect(() => {
    localStorage.setItem(`Todo's`, JSON.stringify(items));
  }, [items, newdata])

  return (
    <div>
      <header>
        <h4>Todo List</h4>
      </header>

      <div className="main">
        <form>
          <textarea name="todo" id="todo" placeholder='Add something...'
            value={todo}
            onChange={(event) => setTodo(event.target.value)} >
          </textarea>

          <div >
            <p className='plus' onClick={additem} > <AiOutlinePlus />  </p>
            <p>Add todo</p>
          </div>
        </form>

        {
          items.map((item) => {
            return toggleupdate && updateobj === item.id ?
              <div key={item.id} id='updateform' >
                <input type="text"  
                defaultValue={item.name}
                onChange={(event) => setNewdata(event.target.value)} />
                <input type='submit' value="Save"  onClick={() => handleSubmit()} />
              </div>

              : <div className='list' key={item.id} >                
                  <p> {item.name} </p>
                  <div className="icons">
                    <FaPencilAlt title='Update todo' onClick={() => updateItem(item.id)} />
                    <RiDeleteBinLine title='Delete todo' onClick={() => deleteItem(item.id)} />
                  </div> 
              </div>
          })
        }
        <button type='button' onClick={() => setItems([])} >Remove All</button>
      </div>

    </div>
  )
}

export default Todo
