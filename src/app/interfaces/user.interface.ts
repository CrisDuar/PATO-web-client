
export interface User {
    id: string;
    name: string;
    email: string;
}


export interface UpdateEmail {
    new_email: string;
    password: string;
}

export interface UpdateName {
    name: string;
}

export interface UpdatePassword {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}