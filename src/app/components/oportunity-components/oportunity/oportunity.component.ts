import { Component } from '@angular/core';
import { OportunityService } from '../../../services/oportunity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oportunity',
  standalone: false,
  templateUrl: './oportunity.component.html',
  styleUrl: './oportunity.component.scss'
})
export class OportunityComponent {

  constructor(private router: Router, private oportunityService: OportunityService){}

  oportunity: any [] = [];

  ngOnInit(){

    this.oportunityService.getAll(0, 100).subscribe(
      {
        next: (response) => {

          this.oportunity = response.content;

          console.log(this.oportunity)
        
        },
        error: (error) => {
       
          console.error(error);
          // manda mensagem de error de login

        },
        complete: () => {
        }
      }
    )

  }

  // Alterna o estado "expandido" do depoimento ao clicar no link
  toggleText(egresso: any, event: Event) {
    event.preventDefault(); // para não rolar para o topo
  }

}
