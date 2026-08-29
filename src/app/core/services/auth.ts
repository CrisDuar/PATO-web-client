import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';


@Service()
export class Auth {
    private LOGIN_URL = `${environment.apiAddr}/api/users/login`;
    private LOGOUT_URL = `${environment.apiAddr}/api/users/logout`;
    private tokenKey = 'authToken';

    private httpClient = inject(HttpClient);
    private router = inject(Router);

    login(email: string, password: string): Observable<any> {
        return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
            tap(response => {
                if (response.token) {
                    console.log(response.token);
                    this.setToken(response.token);
                }
            }
            )
        )
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    private getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.expires_in * 1000;
        return Date.now() < exp;
    }

    logout(): void {
        this.httpClient.post(this.LOGOUT_URL, {}).pipe(
            finalize(() => {
                localStorage.removeItem(this.tokenKey);
                this.router.navigate(['']);
            })
        ).subscribe();

    }

}

