import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UpdateEmailDto, UpdateNameDto, UpdatePasswordDto, User } from '../../interfaces/user.interface';

@Service()
export class UserService {

    private httpClient = inject(HttpClient);
    private API_URL = `${environment.apiAddr}/api/users`;

    updateEmail(payload: UpdateEmailDto): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/email`, payload);
    }

    updateName(payload: UpdateNameDto): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/name`, payload);
    }

    updatePassword(payload: UpdatePasswordDto): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/password`, payload);
    }

    getProfile(): Observable<User> {
        return this.httpClient.get<User>(`${this.API_URL}/me`);
    }

}
