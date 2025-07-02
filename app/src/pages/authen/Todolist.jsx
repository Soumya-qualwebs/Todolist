import React, { useState } from "react";

const Todolist = () => {
  const [tittle, settittle] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState([]);
  const [editIndex, seteditIndex] = useState(null);
  const [tittleerror, settittleerror] = useState("");

  const submithandler = (e) => {
    e.preventDefault();

    if (!tittle.trim() || !desc.trim()) {
      alert("Please add a task and description first.");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...maintask];
      updatedTasks[editIndex] = { tittle, desc };
      setmaintask(updatedTasks);
      seteditIndex(null);
    } else {
      setmaintask([...maintask, { tittle, desc }]);
    }

    settittle("");
    setdesc("");
  };

  const deleteHandler = (i) => {
    const copyTask = [...maintask];
    copyTask.splice(i, 1);
    setmaintask(copyTask);
  };

  const editTask = (i) => {
    const task = maintask[i];
    let edittask = "";
    settittle(task.tittle);
    setdesc(task.desc);
    seteditIndex(i);
  };

  let edittask="";

  let renderTask = <h5 className="text-muted text-center">No task available</h5>;
  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => (
      <li
        key={i}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="flex justify-between ">
          <h5 className="mb-1 col-4 p-2 border-2">{t.tittle}</h5>
          <p className="mb-1 border-2  p-2 col-6 text-muted">{t.desc}</p>
        </div>
        <div>
          <button
            onClick={() => deleteHandler(i)}
            className="btn btn-danger btn-sm me-2"
          >
            Delete
          </button>
          <button
            onClick={() => editTask(i)}
            className="btn btn-primary btn-sm"
          >
            Edit
          </button>
        </div>
      </li>
    ));
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1683309568772-57011d6c1b7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
        
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div className="container py-4 rounded-2xl">
          <div className="text-center mb-4">
            <h1 className="text-dark">Hello, The Todo Inventor!</h1>
          </div>

          <form
            onSubmit={submithandler}
            className="row g-3 mb-4 justify-content-center"
          >
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Add your task"
                value={tittle}
                onChange={(e) => settittle(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Add your description"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                {editIndex !== null ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>

          <ul className="list-group">{renderTask}</ul>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
