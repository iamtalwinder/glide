import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@app/types';
import { APIStatusEnum } from '@app/types';
import { createAppSlice } from '@app/store';

interface UserState {
  user: User | null;
  status: APIStatusEnum;
}

const initialState: UserState = {
  user: null,
  status: APIStatusEnum.IDLE
};

export const userSlice = createAppSlice({
  name: 'auth/user',
  initialState,
  reducers: create => ({
    setUser: create.reducer((state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }),
    fetchUserProfile: create.asyncThunk(
      async (userId: number, { rejectWithValue }) => {
        try {
          const response = { data: { id: userId, name: 'John Doe', email: 'user1@example.com' } }; // Mocked response
          return response.data;
        } catch (error) {
          return rejectWithValue('Failed to fetch user profile');
        }
      },
      {
        pending: state => {
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = APIStatusEnum.IDLE;
          state.user = action.payload;
        },
        rejected: state => {
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  })
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
