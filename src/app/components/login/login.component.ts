import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AutenticationService } from '../../services/autentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  typeUser: boolean = true;

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AutenticationService, private router: Router){}

  ngOnInit(){

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required , Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });


  }

  onSubmit(){

    if(this.loginForm.valid){

      const login = { data: this.loginForm.get('email')?.value, password: this.loginForm.get('password')?.value, role: this.typeUser ? 'coordenador' : 'egresso'}

      this.authService.login(login).subscribe(
        {
          next: (response) => {

            if(response.success){

              this.router.navigate(['dashboard']);


            }else{
            
              // manda mensagem de error de login

            }     
          },
          error: (error) => {
         
            // manda mensagem de error de login
  
          },
          complete: () => {
          }
        }
      )
    
    }else{
      this.loginForm.markAllAsTouched();
    }

  }


  typeUserCoordenador() {

    this.typeUser = true;

  }
  
  typeUserEngresso() {

    this.typeUser = false;

  }


  shouldShowError(campo: string): boolean {
    const control = this.loginForm.get(campo);

    return !!control?.invalid && !!control?.dirty && !!control?.touched;

    //return !!control?.invalid && (control?.touched || control?.dirty);

  }

}
