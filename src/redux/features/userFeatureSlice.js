import { createSlice } from 'redux-starter-kit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {}
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
