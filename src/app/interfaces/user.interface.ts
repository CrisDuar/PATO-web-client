
export interface User {
    id: string;
    username: string;
    email: string;
}


export interface UpdateEmail {
    new_email: string;
    password: string;
}

export interface UpdateName {
    new_username: string;
}

export interface UpdatePassword {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
}