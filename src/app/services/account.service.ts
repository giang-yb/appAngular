import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../models/account.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
}

const apiUrl = 'https://63a2c08f471b38b206fae112.mockapi.io/account';

@Injectable({
  providedIn: 'root'
})
export class AcccountService {

  private accSubject: BehaviorSubject<Account | null>;
  
  constructor(private http: HttpClient) {
    this.accSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('account')!));
  }

  public get accValue(){
    return this.accSubject.value;
  }

  public getListAccount(): Observable<any> {
    return this.http.get<any>(apiUrl);
  }
  
}