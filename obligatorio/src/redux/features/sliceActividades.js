import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actividades: [],
};

const sliceActividades = createSlice({
  name: "actividades",
  initialState,
  reducers: {
    cargarActividades: (state, action) => {
      state.actividades = action.payload;
    },
    addActividad: (state, action) => {
      state.actividades.push(action.payload);
    },
  },
});

export const { cargarActividades, addActividad } = sliceActividades.actions;
export default sliceActividades.reducer;
