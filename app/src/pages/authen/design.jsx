import React, { useState, useEffect } from "react";

const Todolist = () => {
  const [maintask, setmaintask] = useState([]);
  const [editIndex, seteditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [priority, setpriority] = useState("High");
const [complete, setcomplete] = useState(true);
const [tittleerror, settittleerror] = useState("");
const [descerror, setdesceerror] = useState("");
  const [tittle, settittle] = useState("");
  const [desc, setdesc] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setmaintask(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(maintask));
  }, [maintask]);

  const submithandler = (e) => {
    e.preventDefault();

    const tittleWords = tittle.trim().length;
    const descWords = desc.trim().length;

    if (tittleWords < 2 ) {
      settittleerror("Enter atleast two letters")
      return;
    }
    if (descWords < 2) {
      setdesceerror("Enter atleast two letters");
      return;
    }
    setmaintask([...maintask, { tittle, desc, priority, completed: false }]);

    settittle("");
    setdesc("");
    setpriority("High");
  };

  const deleteHandler = (i) => {
const ans=confirm("are you sure you want to mark the task as complete")
if(ans)
{
  const updatedTasks = [...maintask];
    updatedTasks[i].completed = true;
    setmaintask(updatedTasks);
}
    
  };
 const startcompletetask=(i)=>
 {
  const ans=confirm("are you sure you want to delte the task")
  console.log(ans);
  if(ans)
  {
const copyTask = [...maintask];
  copyTask.splice(i, 1);
  setmaintask(copyTask);

  }
  
 }
  
  const startEditTask = (i) => {
    seteditIndex(i);
    setEditTitle(maintask[i].tittle);
    setEditDesc(maintask[i].desc);
    setpriority(maintask[i].priority); 
  };

  const updateTask = (i) => {
    const updatedTasks = [...maintask];
    updatedTasks[i] = { tittle: editTitle, desc: editDesc, priority };
    setmaintask(updatedTasks);
    seteditIndex(null);
    setEditTitle("");
    setEditDesc("");
    setpriority("High");
    if(complete)
    {

    }
    
  };

  const cancelEdit = () => {
    seteditIndex(null);
    setEditTitle("");
    setEditDesc("");
    setpriority("High");
  };

  let renderTask;

  if (maintask.length > 0) {
    renderTask = (
      <table className="table p-4">
        <thead className="p-4" style={{ background: "#fef5e7" }}>
          <tr className="text-center">
            <th className="text-center" scope="col">
              Tittle
            </th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {maintask.map((t, i) =>
            editIndex === i ? (
              <tr className="text-center" key={i}>
                <td>
                  <input
                    className="form-control"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="form-control"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-select"
                    value={priority}
                    onChange={(e) => setpriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </td>{" "}
                <td>
                  <button
                    onClick={() => updateTask(i)}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="btn btn-outline-dark btn-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr className="text-center" key={i}>
                <td
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    maxWidth: "150px", 
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={t.tittle} 
                >
                  {t.tittle}
                </td>
                <td
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    maxWidth: "150px", 
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={t.desc} 
                >
                  {t.desc}
                </td>
                <td>
                  <h6 className="mb-0">
                    <span
                      className={`badge ${
                        t.priority === "High"
                          ? "bg-danger"
                          : t.priority === "Medium"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                      style={{
                        opacity: t.completed ? 0.5 : 1,
                        pointerEvents: t.completed ? "none" : "auto",
                      }}
                    >
                      {t.priority}
                    </span>
                  </h6>
                </td>
                <td>
                  <button
                    data-toggle="tooltip"
                    data-placement=""
                    title="delte the code"
                    onClick={() => startcompletetask(i)}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                  <button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="edit the code"
                    onClick={() => startEditTask(i)}
                    className="btn btn-outline-dark btn-sm  me-2"
                    disabled={t.completed}
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>

                  <button
                    data-toggle="tooltip"
                    data-placement="top"
                    title="mark the code"
                    onClick={() => deleteHandler(i)}
                    disabled={t.completed}
                    className="btn btn-outline-dark btn-sm me-2"
                  >
                    <i class="bi bi-eraser-fill"></i>
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  } else {
    renderTask = (
      <div className="text-center h-80 p-5">
        <h5 className="text-muted">No task available</h5>
        <div className="p-4">
          <i className="bi bi-clipboard2 fs-2" style={{ fontSize: "40px" }}></i>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url("https://plus.unsplash.com/premium_photo-1683309568772-57011d6c1b7b?q=80&w=1170&auto=format&fit=crop")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
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
            <h1 className="text-dark">Hello, The Todo Inventoooor!</h1>
          </div>

          <form
            onSubmit={submithandler}
            className="row g-3 mb-4 justify-content-center"
          >
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add your task"
                value={tittle}
                onChange={(e) => settittle(e.target.value)}
              />
              {tittleerror && <p className="text-danger">{tittleerror}</p>}
            </div>

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add your description"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
              {tittleerror && <p className="text-danger">{tittleerror}</p>}
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setpriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">
                Add Task
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
