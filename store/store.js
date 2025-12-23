import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/user-slice/user.slice';
import blogsReducer from './slices/blogs/blogs.slice';
import categoryReducer from './slices/category/category.slice';
import authorReducer from './slices/author/author.slice';
import teamMemberReducer from './slices/team-member/team-member.slice';
export const store = configureStore({
        reducer: {
                userSlice: userSliceReducer,
                blogSlice: blogsReducer,
                categorySlice: categoryReducer,
                authorSlice: authorReducer,
                teamMemberSlice: teamMemberReducer
        },
});
