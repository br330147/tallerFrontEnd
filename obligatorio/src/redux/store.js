import { configureStore } from "@reduxjs/toolkit";
import usuarioReduce from './features/sliceUsuarios';
import actividadesReducer from './features/sliceActividades';
import actividadesDisponiblesReducer from './features/sliceActividadesDisponibles'
import registrosReducer from "./features/sliceRegistros";

const store = configureStore({
    reducer: {
        usuario: usuarioReduce,
        actividades: actividadesReducer,
        actividadesDisponibles: actividadesDisponiblesReducer,
        registros: registrosReducer,
    },
});

export default store;