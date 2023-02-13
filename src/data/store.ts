import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createBrowserHistory } from 'history'
import { createReduxHistoryContext } from 'redux-first-history'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import { rootReducerObj } from '~/data/reducer'
import RootSaga from '~/data/saga'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user', 'cluster'],
    // whitelist: ['user'],
}

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
})

const rootReducerWithHistory = combineReducers({
    router: routerReducer,
    ...rootReducerObj,
})

const persistedReducer = persistReducer(persistConfig, rootReducerWithHistory)

const sagaMiddleware = createSagaMiddleware()

function middlewares(getDefaultMiddleware: CurriedGetDefaultMiddleware) {
    return [
        ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
        routerMiddleware,
        sagaMiddleware,
    ]
}

export const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    devTools: true,
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(RootSaga)
