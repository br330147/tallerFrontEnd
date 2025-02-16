import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registros: [], 
};

const registrosSlice = createSlice({
  name: "registros",
  initialState,
  reducers: {
    setRegistros: (state, action) => {
      console.log("Guardando registros en Redux:", action.payload);
      state.registros = action.payload;
    },
    eliminarRegistroRedux: (state, action) => {
      state.registros = state.registros.filter(registro => registro.id !== action.payload);
    },
  },
});

export const { setRegistros, eliminarRegistroRedux } = registrosSlice.actions;
export default registrosSlice.reducer;
