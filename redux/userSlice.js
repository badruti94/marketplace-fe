import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        login: false,
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
    }
})

export const { setName, setLogin } = counterSlice.actions

export default counterSlice.reducer