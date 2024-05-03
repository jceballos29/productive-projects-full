import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models';

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isAuthenticated = true;
		},
		clearAuth: (state) => {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
