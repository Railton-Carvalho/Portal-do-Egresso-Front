import { Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: false,
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
   // Lista de depoimentos (exemplo fixo).
  // Em um app real, você poderia buscar via serviço/HTTP.
  testimonials = [
    {
      nome: 'Railton',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    },
    {
      nome: 'Isabele',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    },
    {
      nome: 'Neymar',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    },
    {
      nome: 'Orlando',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    },
    {
      nome: 'Orlando',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    },
    {
      nome: 'Orlando',
      shortText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre...',
      fullText: 'Minha jornada no curso de Ciência da Computação foi transformadora. Desde o primeiro semestre, precisei de maneira lógica e resolver problemas complexos, habilidades que hoje utilizo diariamente no mercado de trabalho. O curso não apenas me proporcionou uma base sólida em programação e tecnologias, mas também me ensinou a trabalhar em equipe e a desenvolver projetos reais, algo essencial na minha carreira como desenvolvedor.',
      isExpanded: false
    }
  ];

  // Alterna o estado "expandido" do depoimento ao clicar no link
  toggleText(depoimento: any, event: Event) {
    event.preventDefault(); // para não rolar para o topo
    depoimento.isExpanded = !depoimento.isExpanded;
  }
}
