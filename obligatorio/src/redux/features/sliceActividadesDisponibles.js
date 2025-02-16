import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  actividades: [],
};

const sliceActividadesDisponibles = createSlice({
  name: "actividades",
  initialState,
  reducers: {
    setActividades: (state, action) => {
      console.log("Guardando actividades en Redux:", action.payload);
      state.actividades = action.payload;
    },
  },
});

export const { setActividades } = sliceActividadesDisponibles.actions;
export default sliceActividadesDisponibles.reducer;
