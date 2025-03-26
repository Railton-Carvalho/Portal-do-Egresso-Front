import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { Router } from '@angular/router';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  private readonly API_URL = environment.apiUrl;


  login(user: any){
    
    return this.http.post(`${this.API_URL}/auth`, user).pipe(
      tap((response: any) => {
        
        console.log(response)
        localStorage.setItem('token', response.message);
        localStorage.setItem('role', user.role);
        localStorage.setItem('id', this.decodeJWT(response.message).id);

        console.log(this.decodeJWT(response.message))


      })
    );

  }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('role');

    this.router.navigate(['login']);

  }


  getToken() {

    return localStorage.getItem('token');
  }

  getRole(){

    return localStorage.getItem('role');

  }

  getId(){

    // let token =  localStorage.getItem('token');

    // if(token){
    //   return this.decodeJWT(token).id;
    // }

    return localStorage.getItem('id');

  }


  decodeJWT(token: string) {
    const payloadBase64 = token.split('.')[1]; // Pegando a segunda parte do JWT
    const decodedPayload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')); // Decodificando Base64Url
    return JSON.parse(decodedPayload);
}


}
