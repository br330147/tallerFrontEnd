import { configureStore } from "@reduxjs/toolkit";
import usuarioReduce from './features/sliceUsuarios';
import actividadesReducer from './features/sliceActividades';

const store = configureStore({
    reducer: {
        usuario: usuarioReduce,
        actividades: actividadesReducer,
    },
});

export default store;