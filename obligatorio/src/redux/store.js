import { configureStore } from "@reduxjs/toolkit";
import usuarioReduce from './features/sliceUsuarios';

const store = configureStore({
    reducer: {
        usuario: usuarioReduce,
    },
});

export default store;