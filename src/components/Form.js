import { useState } from "react";
import { BsCheck } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addNotesAsync, editNotesAsync } from "../redux/notesSlice";

function Form() {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.notes.isEditing);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [color, setColor] = useState("lightgrey");
  const [activeColor, setActiveColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title) return;
    await dispatch(addNotesAsync({title, detail, color}));
    setTitle("");
    setDetail("");
    setColor("");
    document.querySelector(`#${activeColor}`).checked = false;   
  };


  const addColor = (e) => {
    setColor(e.target.value)
    setActiveColor(e.target.id);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" className="title" value={title} maxLength="34" onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea className="note" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="Enter your note here..." required />
      <div className="buttonWrapper">
        <div className="colors">
          <div className="formItem">
            <input type="radio" id="c1" value="lightblue" name="color" onChange={addColor} />
            <label htmlFor="c1" style={{ backgroundColor: "lightblue" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c2" value="pink" name="color" onChange={addColor} />
            <label htmlFor="c2" style={{ backgroundColor: "pink" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c3" value="yellow" name="color" onChange={addColor} />
            <label htmlFor="c3" style={{ backgroundColor: "yellow" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c4" value="lawngreen" name="color" onChange={addColor} />
            <label htmlFor="c4" style={{ backgroundColor: "lawngreen" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c5" value="bisque" name="color" onChange={addColor} />
            <label htmlFor="c5" style={{ backgroundColor: "bisque" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c6" value="coral" name="color" onChange={addColor} />
            <label htmlFor="c6" style={{ backgroundColor: "coral" }}>
              <BsCheck />
            </label>
          </div>
          <div className="formItem">
            <input type="radio" id="c7" value="orange" name="color" onChange={addColor} />
            <label htmlFor="c7" style={{ backgroundColor: "orange" }}>
              <BsCheck />
            </label>
          </div>
        </div>
        <button type="submit" className="btnAdd">
          ADD
        </button>
      </div>
    </form>
  );
}

export default Form;
