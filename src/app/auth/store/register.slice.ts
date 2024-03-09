import { authService } from '@app/services';
import type { APIError, User } from '@app/types';
import { APIStatusEnum } from '@app/types';
import { createAppSlice } from '@app/store';
import { setUser } from './user.slice';

interface RegisterState {
  success: boolean;
  status: APIStatusEnum;
  errors: APIError[];
}

const initialState: RegisterState = {
  success: false,
  status: APIStatusEnum.IDLE,
  errors: []
};

export const registerSlice = createAppSlice({
  name: 'auth/register',
  initialState,
  reducers: create => ({
    submitRegister: create.asyncThunk(
      async (data: User & { password: string }, { rejectWithValue, dispatch }) => {
        try {
          const response = await authService.register(data);
          dispatch(setUser(response.user));
        } catch (error) {
          return rejectWithValue('failed to register');
        }
      },
      {
        pending: state => {
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: state => {
          state.status = APIStatusEnum.IDLE;
        },
        rejected: state => {
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  })
});

export default registerSlice.reducer;
