export interface RegisterRequestDto{
    name: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
}