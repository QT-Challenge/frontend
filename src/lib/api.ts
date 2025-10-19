import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  EmailVerificationDetail,
  PublicKeyResponse,
  PaginatedResponse,
} from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new ApiError(response.status, error || response.statusText);
  }
  return response.json();
}

export const api = {
  users: {
    getAll: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> => {
      const response = await fetch(`${API_BASE_URL}/api/users?page=${page}&limit=${limit}`);
      return handleResponse<PaginatedResponse<User>>(response);
    },

    getById: async (id: string): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
      return handleResponse<User>(response);
    },

    create: async (data: CreateUserDto): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<User>(response);
    },

    update: async (id: string, data: UpdateUserDto): Promise<User> => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return handleResponse<User>(response);
    },

    delete: async (id: string): Promise<{ message: string }> => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      return handleResponse<{ message: string }>(response);
    },

    verifyEmail: async (id: string): Promise<EmailVerificationDetail> => {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}/verify-email`);
      return handleResponse<EmailVerificationDetail>(response);
    },

    export: async (): Promise<Blob> => {
      const response = await fetch(`${API_BASE_URL}/api/users/export`);
      if (!response.ok) {
        throw new ApiError(response.status, response.statusText);
      }
      return response.blob();
    },
  },

  crypto: {
    getPublicKey: async (): Promise<PublicKeyResponse> => {
      const response = await fetch(`${API_BASE_URL}/api/crypto/public-key`);
      return handleResponse<PublicKeyResponse>(response);
    },
  },
};

export { ApiError };
