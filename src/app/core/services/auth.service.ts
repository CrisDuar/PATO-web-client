import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class AuthService {
    private LOGIN_URL = `${environment.apiAddr}/api/users/login`;
    private LOGOUT_URL = `${environment.apiAddr}/api/users/logout`;
    private tokenKey = 'authToken';

    private httpClient = inject(HttpClient);
    private router = inject(Router);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    login(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
            tap((response) => {
                if (response.token) {
                    console.log(response.token);
                    this.setToken(response.token);
                }
            })
        );
    }

    private setToken(token: string): void {
        if (this.isBrowser) {
            localStorage.setItem(this.tokenKey, token);
        }
    }

    private getToken(): string | null {
        if (this.isBrowser) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    isAuthenticated(): boolean {
        const token = this.getToken();

        return !!token && this.isBrowser;
    }

    logout(): void {
        this.httpClient
            .post(this.LOGOUT_URL, {})
            .pipe(
                finalize(() => {
                    if (this.isBrowser) {
                        localStorage.removeItem(this.tokenKey);
                    }
                    this.router.navigate(['login']);
                })
            )
            .subscribe();
    }
}
