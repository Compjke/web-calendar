import type { store } from './root';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStore = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
