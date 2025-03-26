import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})


export class SidebarComponent {
  menuItems: any[] = [
    { option: 'Egressos', rota: '/egressos' },
    { option: 'Depoimentos', rota: '/depoimentos' },
    { option: 'Oportunidades', rota: '/oportunidades' },
    { option: 'Relatórios', rota: '/relatorios' },
  ];

}
