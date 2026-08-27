import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Service()
export class RegistryService {
    private LOGIN_URL = `${environment.apiAddr}/api/users/register`;

    private httpClient = inject(HttpClient);
    registry(username: string, email: string, password: string, confirm_password: string) {
        return this.httpClient.post<any>(this.LOGIN_URL, {
            username, 
            email, 
            password, 
            confirm_password});
    }

}
