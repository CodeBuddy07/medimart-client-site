/* eslint-disable @typescript-eslint/no-explicit-any */

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData extends LoginData {
    name: string;
    phone: string;
    address: string;
    Image?: File;
}

interface UpdateData {
    [key: string]: any;
}


