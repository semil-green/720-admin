import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: []
};

const blogsSlice = createSlice({

    name: 'blogsSlice',
    initialState,
    reducers: {
        setAllBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        updateBlogStatus: (state, action) => {
            state.blogs = state.blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog)
        }
    }
})

export const { setAllBlogs, updateBlogStatus } = blogsSlice.actions;
export default blogsSlice.reducer;