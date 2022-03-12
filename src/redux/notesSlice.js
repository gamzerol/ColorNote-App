import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNotesAsync = createAsyncThunk(
  "notes/getNotesAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`);
    return res.data;
  }
);

export const addNotesAsync = createAsyncThunk("notes/addNotesAsync", async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes`, data);
  return res.data;
});

export const deleteNotesAsync = createAsyncThunk(
  "notes/deleteNotesAsync",
  async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes/${id}`);
    return id;
  }
);

export const editNotesAsync = createAsyncThunk("notes/editNotesAsync", async (id) => {
  const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/notes/${id}`)
  return res.data;
});

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    items: [],
    initialItems: [],
    isLoading: false,
    isNewNoteLoading: false,
    error: null,
    searchValue: '',
  },
  reducers: {
    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
    filterNote: (state, action) => {
      const filteredList = state.initialItems.filter((note) => note.title.includes(action.payload))
      state.items = filteredList;
    },
  },
  extraReducers: {
    [getNotesAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
      state.initialItems = action.payload;
    },
    [getNotesAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = state.error.message;
    },
    [addNotesAsync.pending]: (state, action) => {
      state.isNewNoteLoading = true
    },
    [addNotesAsync.fulfilled]: (state, action) => {
      state.isNewNoteLoading = false;
      state.items.push(action.payload);
    },
    [deleteNotesAsync.fulfilled]: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    },
    [editNotesAsync.fulfilled]: (state, action) => {
      state.isEditing = true;
      state.editingItem = action.payload;
    }
  },
});

export const { clearCompleted, filterNote } = notesSlice.actions;

export default notesSlice.reducer;
