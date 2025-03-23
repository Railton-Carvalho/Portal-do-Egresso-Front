import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {

  constructor(private http: HttpClient) { }


  login(user: any){

    return this.http.post('url', user).pipe(
      tap((response: any) => {
        
        localStorage.setItem('token', response.message);

      })
    );

  }


}
