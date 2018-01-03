import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

 getMenu() {
    return this.http.get('https://dc2.com.ve/appresta/vermenu.php');
  }
   
}

