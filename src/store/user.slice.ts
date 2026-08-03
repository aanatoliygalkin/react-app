// src/store/user.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState, saveState } from "./storage";

export const USER_PERSISTENT_STATE = 'usersData';

export interface MovieItem {
    id: number;
    title: string;
    image: string;
    rating: string;
}

export interface UserProps {
    id: string;
    name: string;
    isLogined: boolean;
    cart: MovieItem[];
    token?: string;
}

export interface UsersState {
    users: UserProps[];
    currentUser: UserProps | null;
    inputName: string;
}

const loadedState = loadState<UsersState>(USER_PERSISTENT_STATE);

const initialState: UsersState = loadedState ?? {
    users: [],
    currentUser: null,
    inputName: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInputName: (state, action: PayloadAction<string>) => {
            state.inputName = action.payload;
        },

        loginUser: (state) => {
            const inputName = state.inputName.trim();
            if (!inputName) return;

            let existingUser = state.users.find(u => u.name === inputName);

            if (existingUser) {
                state.users = state.users.map(u => ({
                    ...u,
                    isLogined: false,
                    token: undefined
                }));
                
                // Находим пользователя снова, так как он мог измениться
                const updatedUser = state.users.find(u => u.id === existingUser!.id);
                if (updatedUser) {
                    updatedUser.isLogined = true;
                    updatedUser.token = generateToken();
                    state.currentUser = updatedUser;
                }
            } else {
                const newUser: UserProps = {
                    id: generateId(),
                    name: inputName,
                    isLogined: true,
                    cart: [],
                    token: generateToken()
                };
                
                state.users = state.users.map(u => ({
                    ...u,
                    isLogined: false,
                    token: undefined
                }));
                
                state.users.push(newUser);
                state.currentUser = newUser;
            }

            state.inputName = '';
            saveState(state, USER_PERSISTENT_STATE);
        },

        logoutUser: (state) => {
            state.users = state.users.map(u => ({
                ...u,
                isLogined: false,
                token: undefined
            }));
            state.currentUser = null;
            saveState(state, USER_PERSISTENT_STATE);
        },

        toggleFavorite: (state, action: PayloadAction<MovieItem>) => {
            if (!state.currentUser) {
                console.warn('Попытка добавить в избранное без авторизации');
                return;
            }

            // Находим пользователя по ID
            const userIndex = state.users.findIndex(u => u.id === state.currentUser!.id);
            if (userIndex === -1) {
                console.warn('Текущий пользователь не найден в списке');
                return;
            }

            // Работаем с пользователем напрямую
            const user = state.users[userIndex];
            const movieIndex = user.cart.findIndex(item => item.id === action.payload.id);
            
            if (movieIndex === -1) {
                user.cart.push(action.payload);
                console.log(`Фильм "${action.payload.title}" добавлен в избранное`);
            } else {
                user.cart.splice(movieIndex, 1);
                console.log(`Фильм "${action.payload.title}" удален из избранного`);
            }

            // Обновляем currentUser ссылкой на обновленного пользователя
            state.currentUser = user;
            
            // Сохраняем состояние
            saveState(state, USER_PERSISTENT_STATE);
        },

        clearUsers: (state) => {
            state.users = [];
            state.currentUser = null;
            state.inputName = '';
            saveState(state, USER_PERSISTENT_STATE);
        }
    }
});

function generateToken(): string {
    return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateId(): string {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default userSlice.reducer;
export const userActions = userSlice.actions;