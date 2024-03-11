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
        } catch (error: any) {
          return rejectWithValue(error.response.data);
        }
      },
      {
        pending: state => {
          state.errors = [];
          state.status = APIStatusEnum.LOADING;
        },
        fulfilled: state => {
          state.errors = [];
          state.status = APIStatusEnum.SUCCESS;
        },
        rejected: (state, action: any) => {
          state.errors = action.payload.errors;;
          state.status = APIStatusEnum.FAILED;
        }
      }
    )
  }),
  selectors: {
    selectRegisterError: state => state.errors,
    selectRegisterStatus: state => state.status
  },
});

export const { submitRegister } = registerSlice.actions;
export const { selectRegisterError, selectRegisterStatus } = registerSlice.selectors;

export default registerSlice.reducer;
