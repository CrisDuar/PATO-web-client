import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);

    if (isPlatformBrowser(platformId)) {
        const token = localStorage.getItem('authToken');

        // Log para depurar en consola del navegador
        console.log(`[Interceptor] Petición a: ${req.url} | Token encontrado:`, !!token);

        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next(authReq);
        }
    }

    return next(req);
};