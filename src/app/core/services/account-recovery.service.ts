import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Service()
export class AccountRecoveryService {
    private URL_RECOVERY = `${environment.apiAddr}/api/users/forgot-password`;
    private URL_VERIFY = `${environment.apiAddr}/api/users/reset-password`;
    readonly userEmail = signal<string>('');

    private httpClient = inject(HttpClient);

    requestPasswordReset(email: string) {
        return this.httpClient.post<any>(this.URL_RECOVERY, { email });
    }

    verifyToken(token: string, password: string, confirm_password: string) {
        return this.httpClient.post<any>(this.URL_VERIFY, { token, password, confirm_password });
    }

    setEmail(email: string) {
        this.userEmail.set(email);
    }

}
