import { configureStore } from "@reduxjs/toolkit";
import actividadesReducer from './features/sliceActividades';
import actividadesDisponiblesReducer from './features/sliceActividadesDisponibles'
import registrosReducer from "./features/sliceRegistros";

const store = configureStore({
    reducer: {
        actividades: actividadesReducer,
        actividadesDisponibles: actividadesDisponiblesReducer,
        registros: registrosReducer,
    },
});

export default store;