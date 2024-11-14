import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const API_BASE = "https://todo-api-supd.onrender.com/todo";

function TodoItem(props) {
  const { name, id, setItems } = props;

  const deleteTodo = async (id) => {
    try {
      //   console.log(id);
      const response = await fetch(API_BASE + "/delete/" + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Faild to delete a task");
      }
      const data = await response.json();
      setItems((items) => items.filter((item) => item._id !== data._id));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <div className="bg-primary   text-white rounded-3 my-2 p-2">
      <div className="container d-flex justify-content-between">
        <div className="text">{name}</div>
        <div className="delete-todo" onClick={() => deleteTodo(id)}>
          <span>
            <i class="bi bi-trash3-fill"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
