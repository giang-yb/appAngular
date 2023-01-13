import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getListUsers(): Observable<any> {
    return this.http.get<any>('https://63a2c08f471b38b206fae112.mockapi.io/user', {});
  }

  getUserById(maNV: number): Observable<any> {
    return this.http.get<any>('https://63a2c08f471b38b206fae112.mockapi.io/user/' + maNV, {});
  }
  addUser(data: any) {
    return this.http.post('https://63a2c08f471b38b206fae112.mockapi.io/user', data);
  }

  updateUser(maNV:number, data: any) {
    return this.http.put('https://63a2c08f471b38b206fae112.mockapi.io/user/' + maNV, data);
  }

  deleteUser(maNV: number) {
    return this.http.delete('https://63a2c08f471b38b206fae112.mockapi.io/user/' + maNV);
  }
}
