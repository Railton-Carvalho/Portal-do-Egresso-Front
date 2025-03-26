import { Component } from '@angular/core';
import { AutenticationService } from '../../services/autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isAuth: boolean = false;

  constructor(private authService: AutenticationService, private router: Router){}


  ngOnInit(){

    let auth = this.authService.getToken();

    if(auth){
      this.isAuth = true;
    }

  }

  onHomeBtnClicked(){
    this.router.navigate(['dashboard']);
  }

  onExitBtnClicked() {
    this.authService.logout()
  }
}
