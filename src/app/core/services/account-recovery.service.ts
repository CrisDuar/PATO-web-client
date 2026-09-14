import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Service()
export class AccountRecoveryService {
    private recovery_url = `${environment.apiAddr}/api/users/forgot-password`;
    private verify_token_url = `${environment.apiAddr}/api/users/verify-reset-token`;
    private reset_pass_url = `${environment.apiAddr}/api/users/reset-password`;
    readonly userEmail = signal<string>('');

    private httpClient = inject(HttpClient);

    requestPasswordReset(email: string) {
        return this.httpClient.post<any>(this.recovery_url, { email });
    }

    verifyToken(token: string) {
        return this.httpClient.post<any>(this.verify_token_url, { token });
    }

    newPassword(reset_token: string, password: string, confirm_password: string) {
        return this.httpClient.post<any>(this.reset_pass_url, { reset_token, password, confirm_password });
    }

    setEmail(email: string) {
        this.userEmail.set(email);
    }

}
