import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-distributed-columns',
  standalone: false,
  templateUrl: './distributed-columns.component.html',
  styleUrl: './distributed-columns.component.scss'
})
export class DistributedColumnsComponent {
  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Vendas",
          data: [30, 40, 25, 50, 49, 21] // Dados corretos
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          distributed: true
        }
      },
      xaxis: {
        categories: ["Brasil", "EUA", "Canadá", "França", "China", "Índia"]
      }
    };
  }
}
