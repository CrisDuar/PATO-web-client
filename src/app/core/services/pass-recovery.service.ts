import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Service()
export class PassRecoveryService {
    private LOGIN_URL = `${environment.apiAddr}/api/users/forgot-password`;

    private httpClient = inject(HttpClient);
    registry(email: string) {
        return this.httpClient.post<any>(this.LOGIN_URL, {email});
    }
}
