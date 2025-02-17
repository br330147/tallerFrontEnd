import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registros: [], 
};

const registrosSlice = createSlice({
  name: "registros",
  initialState,
  reducers: {
    setRegistros: (state, action) => {
      state.registros = action.payload;
    },
    eliminarRegistroRedux: (state, action) => {
      state.registros = state.registros.filter(registro => registro.id !== action.payload);
    },
  },
});

export const { setRegistros, eliminarRegistroRedux } = registrosSlice.actions;
export default registrosSlice.reducer;
