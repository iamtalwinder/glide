import { combineSlices } from '@reduxjs/toolkit';
import { loginSlice } from './login.slice';
import { registerSlice } from './register.slice';
import { userSlice } from './user.slice';

export const authReducer = combineSlices(userSlice, loginSlice, registerSlice);
