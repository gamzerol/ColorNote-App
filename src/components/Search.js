import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { filterNote } from '../redux/notesSlice';

function Search() {
  const dispatch = useDispatch();
  const searchNote = (e) => {
    dispatch(filterNote(e.target.value))
  }

  return (
    <div className='search'>
      <input type='text' className='search-item' placeholder='Search note' onChange={searchNote} />
    </div>
  )
}

export default Search;