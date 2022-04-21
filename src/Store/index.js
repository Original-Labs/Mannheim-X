import { createStore } from 'redux'
import reducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist'
//  存储机制，当前使用sessionStorage, 可换成localStorage
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
  key: 'root', // 必须有的
  storage: storageSession, // 缓存机制
  blacklist: ['inputValue'], // reducer 里不持久化的数据,除此外均为持久化数据
  whitelist: ['poolList', 'banner', 'searchList', 'subscribeList'] // reducer 里持久化的数据,除此外均为不持久化数据
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) // 创建数据存储仓库

const persistor = persistStore(store)

export { store, persistor }
