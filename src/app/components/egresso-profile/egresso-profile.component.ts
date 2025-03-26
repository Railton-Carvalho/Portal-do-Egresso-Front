import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EgressoService } from '../../services/egresso.service';

@Component({
  selector: 'app-egresso-profile',
  standalone: false,
  templateUrl: './egresso-profile.component.html',
  styleUrl: './egresso-profile.component.scss'
})
export class EgressoProfileComponent {

  constructor(private route: ActivatedRoute, private egressoService: EgressoService){}

  egresso: any = {} as any;
  cursos: any[] = [];
  cargos: any[] = [];

  ngOnInit(){

    this.route.paramMap.subscribe(params => {

      const cpf = params.get('cpf');

      if(cpf){

        this.egressoService.recuperarEgresso(cpf).subscribe(
          {
            next: (response) => {
              
             console.log(response)

             this.egresso = response

             this.egressoService.recuperarCurso(response.id).subscribe(
              {
                next: (response) => {
                  this.cursos = response.content

                  console.log(response.content)


                }
              }
            )

            this.egressoService.recuperarCargos(response.id).subscribe(
              {
                next: (response) => {
                  this.cargos = response.content

                  console.log(response.content)

                }
              }
            )


            }
          }
        );
        
      }
    });

  

  }

}
