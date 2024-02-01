import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpService: HttpService,
    private router: Router,
    public storageService: StorageService
  ) {}

  login(postDate: any): Observable<any> {
    return this.httpService.post('auth', postDate);
  }


  payin(postDate: any): Observable<any> {
    return this.httpService.post('payin', postDate);
  }
  payout(postDate: any): Observable<any> {
    return this.httpService.post('payout', postDate);
  }

  typedocument(postDate: any): Observable<any> {
    return this.httpService.get('api-siigo/documentype', postDate);
  }
 
  viewmenu(postDate: any): Observable<any> {
    return this.httpService.get('menu', postDate);
  }

  debito(postDate: any): Observable<any> {
    return this.httpService.post('api-siigo/debito', postDate);
  }


  credito(postDate: any): Observable<any> {
    return this.httpService.post('api-siigo/credito', postDate);
  }

 
  close() {
    this.storageService.removeItem(AuthConstants.AUTH);
    this.router.navigate(['']);
    /* location.reload(); */
  }
}