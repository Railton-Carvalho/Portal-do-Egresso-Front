import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EgressoService } from '../../services/egresso.service';

@Component({
  selector: 'app-egresso-components',
  standalone: false,
  templateUrl: './egresso-components.component.html',
  styleUrl: './egresso-components.component.scss'
})
export class EgressoComponentsComponent {

  constructor(private router: Router, private egressoService: EgressoService){}

  egressos: any [] = [];

  ngOnInit(){

    this.egressoService.recuperarEgressos(0, 100).subscribe(
      {
        next: (response) => {

          this.egressos = response.content;

          console.log(response)
        
        },
        error: (error) => {
       
          console.log(error)

        },
        complete: () => {
        }
      }
    )

  }

  // Alterna o estado "expandido" do depoimento ao clicar no link
  toggleText(egresso: any, event: Event) {
    event.preventDefault(); // para não rolar para o topo
    this.router.navigate(['perfil_egresso', egresso.cpf]);
  }
}
