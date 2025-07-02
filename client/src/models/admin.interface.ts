export interface IAdmin {
    _id?: string
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone: number
    confirmPassword?: string
    profile?: string
    role: 'Admin';
    status?: 'active' | 'inactive';
    token?: string
}