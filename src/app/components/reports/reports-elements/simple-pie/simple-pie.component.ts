import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-simple-pie',
  standalone: false,
  templateUrl: './simple-pie.component.html',
  styleUrl: './simple-pie.component.scss'
})
export class SimplePieComponent {
  @ViewChild("chart") chart!: ChartComponent;
  
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [65, 45, 13, 43, 22],
      chart: {
        width: 470,
        type: "pie"
      },
      labels: ["Desenvolvedor Backend", "Contador", "Product Owner", "Pedreiro", "Professor"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
