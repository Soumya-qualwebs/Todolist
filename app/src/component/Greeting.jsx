import { useState } from "react";

const Greeting = ({ name }) => {
  const [count, setcount] = useState(0);
  const [msg, setmsg] = useState("on");
  const handlemsg = () => {
    if (msg == "on") setmsg("off");
    else setmsg("on");
  };

  const color = () => {};
  const handlei = () => {
    setcount(count + 1);
  };
  const handled = () => {
    if (count == 0) {
    }
    setcount(count - 1);
  };
  return (
    <>
      <h1>{name}</h1>
      <button onClick={handlemsg}>{msg}</button>
      <div className="btn btn-primary" style={{ background: `${count === 5 ? "red":""}` }}>
        {count}
      </div>
      <button className="btn btn-success" onClick={handlei}>
        increment
      </button>
      <button
        disabled={count === 0}
        className="btn btn-danger"
        onClick={handled}
      >
        decrement
      </button>
    </>
  );
};
export default Greeting;
