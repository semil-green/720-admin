import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/user-slice/user.slice';
import blogsReducer from './slices/blogs/blogs.slice';

export const store = configureStore({
        reducer: {
                userSlice: userSliceReducer,
                blogSlice: blogsReducer
        },
});
