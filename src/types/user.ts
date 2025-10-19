export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface EmailVerification {
  isVerified: boolean;
  signedAt: Date | string;
  lastModified: Date | string | null;
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  emailVerification?: EmailVerification;
}

export interface CreateUserDto {
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface UpdateUserDto {
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface EmailVerificationDetail {
  userId: number;
  email: string;
  verification: {
    isValid: boolean;
    algorithm: string;
    emailHash: string | null;
    emailSignature: string | null;
    signedAt: Date | string;
    lastModified: Date | string | null;
    originalEmail: string | null;
  };
  message: string;
}

export interface PublicKeyResponse {
  publicKey: string;
  algorithm: string;
  keyType: string;
  hashAlgorithm: string;
  usage: string;
  example: {
    step1: string;
    step2: string;
    step3: string;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}
