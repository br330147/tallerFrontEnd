import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    usuario: localStorage.getItem("usuario") || null,
    token: localStorage.getItem("token") || null,
    id: localStorage.getItem("id") || null,
}

const sliceUsuarios = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        setUsuario: (state, action) => {
            state.usuario = action.payload.usuario;
            state.token = action.payload.token;
            state.id = action.payload.id;

            //acá lo mandamos al local storage

            localStorage.setItem("token", action.payload.token);
            // localStorage.setItem("usuario", action.payload.usuario);
            localStorage.setItem("id", action.payload.id);
        },
        logout: (state) => {
            state.token = null;
            // state.usuario = null;
            state.id = null;
            // localStorage.removeItem("token");
            // localStorage.removeItem("usuario");
            // localStorage.removeItem("id");
            localStorage.clear();
          },
    },
});

export const { setUsuario, logout } = sliceUsuarios.actions;
export default sliceUsuarios.reducer;