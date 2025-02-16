import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actividades: [],
};

const sliceActividades = createSlice({
  name: "actividades",
  initialState,
  reducers: {
    agregarActividad: (state, action) => {
      state.actividades.push(action.payload);
    },
    cargarActividades: (state, action) => {
      state.actividades = action.payload;
    },
  },
});

export const { cargarActividades, agregarActividad } = sliceActividades.actions;
export default sliceActividades.reducer;
