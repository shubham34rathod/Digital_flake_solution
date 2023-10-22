import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/userSlice.js'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'iws',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer
    }
})

export  let persistor = persistStore(store)