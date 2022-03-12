import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { getNotesAsync, deleteNotesAsync } from "../redux/notesSlice";

function NoteList(props) {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.notes.items);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({
    id: "",
    title: "",
    detail: "",
    color: "",
  });
  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteNotesAsync(id));
  };

  return (
    <div className="noteList">
      {noteList.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{ backgroundColor: `${note.color}` }}
        >
          <div className="noteHeader">
            <span className="noteTitle">{note.title}</span>
            <div className="note-btns">
              <button
                className="deleteNote"
                onClick={() => handleDelete(note.id)}
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          </div>
          <div className="noteDetails">{note.detail}</div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
