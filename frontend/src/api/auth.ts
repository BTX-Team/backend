import apiClient from './client';

export interface LoginRequest {
  memberEmail: string;
  memberPw: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  memberEmail: string;
  memberPw: string;
  memberNickname: string;
  memberTel?: string;
}

export const login = (data: LoginRequest) =>
  apiClient.post<LoginResponse>('/member/login', data);

export const signup = (data: SignupRequest) =>
  apiClient.post('/member/signup', data);

export const checkEmail = (memberEmail: string) =>
  apiClient.get<{ available: boolean }>('/member/check-email', { params: { memberEmail } });

export const checkNickname = (memberNickname: string) =>
  apiClient.get<{ available: boolean }>('/member/check-nickname', { params: { memberNickname } });
