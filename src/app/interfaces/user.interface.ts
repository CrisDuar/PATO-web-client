
export interface User {
    id: string;
    name: string;
    email: string;
}


export interface UpdateEmailDto {
    new_email: string;
    password: string;
}

export interface UpdateNameDto {
    name: string;
}

export interface UpdatePasswordDto {
    current_password: string;
    new_password: string;
}