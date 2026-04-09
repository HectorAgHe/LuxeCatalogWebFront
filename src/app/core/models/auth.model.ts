export interface LoginRequest{
    email: string;
    password: string;
}

export interface AuthResponse{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Admin' | 'User';
    avatar: string | null;
    clvSocio: string;
    active: boolean;
    token: string;
}
export interface AuthUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'Admin' | 'User';
    avatar: string | null;
    clvSocio: string;
}