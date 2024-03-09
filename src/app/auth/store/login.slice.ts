import { authService } from '@app/services';
import type { APIError } from '@app/types';
import { APIStatusEnum } from '@app/types';
import { createAppSlice } from '@app/store';
import { setUser } from './user.slice';

interface LoginState {
  success: boolean;
  status: APIStatusEnum;
  errors: APIError[];
}

const initialState: LoginState = {
  success: false,
  status: APIStatusEnum.IDLE,
  errors: []
};

export const loginSlice = createAppSlice({
  name: 'auth/login',
  initialState,
  reducers: create => ({
    submitLogin: create.asyncThunk(
      async ({ email, password }, { rejectWithValue, dispatch }) => {
        try {
          const response = await authService.login(email, password);
          dispatch(setUser(response.user));
        } catch (error: any) {
          console.error(error, error.data);
          return rejectWithValue('failed to login');
        }
      },
      {
        pending: state => {
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: state => {
          state.status = APIStatusEnum.IDLE;
        },
        rejected: (state, payload) => {
          console.error('payload', payload);
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  })
});

export default loginSlice.reducer;
