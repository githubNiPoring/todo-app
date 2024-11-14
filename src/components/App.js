import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import TodoItem from "./TodoItem";

//Add API base
const API_BASE = "https://todo-api-supd.onrender.com/todo";

function App() {
  const [items, setItems] = useState([]);
  // Add input state, we will store the user's input in this state
  const [input, setInput] = useState("");

  useEffect(() => {
    GetTodos();
  }, []);

  // Store the target's value into the input state
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const GetTodos = async () => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  };
  const addItem = async () => {
    if (!input.trim()) {
      alert("Please enter a to-do item.");
      return;
    }
    const data = await fetch(API_BASE + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: input,
      }),
    }).then((res) => res.json());
    await GetTodos();
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="container d-flex flex-column justify-content-center w-100 min-vh-100">
          <div className="card shadow-lg p-4">
            <div className="d-flex flex-column align-items-center">
              <div className="heading">
                <h1>TO-DO-APP</h1>
              </div>

              <div className="d-flex w-100 my-3">
                <input
                  className="form-control"
                  type="text"
                  value={input}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                ></input>
                <button
                  onClick={() => addItem()}
                  className="btn btn-success ms-2"
                >
                  <span>ADD</span>
                </button>
              </div>
            </div>

            <div className="todolist">
              {items.map((item) => {
                const { _id, name } = item;
                return <TodoItem name={name} id={_id} setItems={setItems} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
