'use strict';

import { API_ENDPOINTS, DEFAULT_OPTIONS } from '../config/apiConfig.js';

// User API functions


export async function registerUser(newUser) {
  try {
    const response = await fetch(API_ENDPOINTS.users.register, {
      method: 'POST',
      headers: DEFAULT_OPTIONS.headers,
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`Erro ao registar utilizador: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao registar utilizador:', error);
    throw error;
  }
}

export async function updateUser(user) {
  try {
    const response = await fetch(API_ENDPOINTS.users.update(user.username), {
      method: 'PUT',
      headers: DEFAULT_OPTIONS.headers,
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o usuário: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw error;
  }
}

export async function checkUsernameExists(username) {
  try {
    const response = await fetch(
      `${API_ENDPOINTS.users.checkUsername}?username=${username}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao verificar username: ${response.statusText}`);
    }

    const result = await response.json();
    return result.exists;
  } catch (error) {
    console.error('Erro ao verificar username:', error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await fetch(
      'http://localhost:8080/filipe-proj4/rest/users/me',
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar informações de utilizador');
    }

    const user = await response.json();
    console.log('User Info:', user);
    return user;
  } catch (error) {
    console.error('Erro ao buscar informações do usuário:', error);
    throw error;
  }
}
