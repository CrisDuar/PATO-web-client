import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UpdateEmail, UpdateName, UpdatePassword, User } from '../../interfaces/user.interface';

@Service()
export class UserService {

    private httpClient = inject(HttpClient);
    private API_URL = `${environment.apiAddr}/api/users`;

    updateEmail(payload: UpdateEmail): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/email`, payload);
    }

    updateName(payload: UpdateName): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/name`, payload);
    }

    updatePassword(payload: UpdatePassword): Observable<any> {
        return this.httpClient.patch(`${this.API_URL}/password`, payload);
    }

    getProfile(): Observable<User> {
        return this.httpClient.get<User>(`${this.API_URL}/me`);
    }

}
