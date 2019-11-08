import { createSlice } from 'redux-starter-kit';

const rehydrateSlice = createSlice({
  name: 'persist',
  initialState: false,
  reducers: {
    /**
     * @return {boolean}
     */
    REHYDRATE(state, action) {
      return true;
    }
  }
});

export default rehydrateSlice.reducer;
