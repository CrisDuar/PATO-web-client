import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Service()
export class RegistryService {
    private LOGIN_URL = `${environment.apiAddr}/api/users/register`;
    private URL_VERIFY = `${environment.apiAddr}/api/users/verify-email`;
    private httpClient = inject(HttpClient);
    readonly registeredEmail = signal<string>('');

    registry(username: string, email: string, password: string, confirm_password: string) {
        return this.httpClient.post<any>(this.LOGIN_URL, {
            username,
            email,
            password,
            confirm_password
        });
    }

    verifyEmail(email: string, token: string) {
        return this.httpClient.post<any>(this.URL_VERIFY, { email, token });
    }

    setEmail(email: string) {
        this.registeredEmail.set(email);
    }

}
