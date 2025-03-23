import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: any;
  dataLabels: any;
  title: any;
  subtitle?: any;
};

@Component({
  selector: 'app-profit-chart',
  standalone: false,
  templateUrl: './profit-chart.component.html',
    styleUrl: './profit-chart.component.scss'
})
export class ProfitChartComponent implements OnInit{
  @ViewChild("chart") chart!: ChartComponent;

  chartOptions!: ChartOptions;

  subTitle: string = 'Egressos Registrados';

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Novos Registrados",
          data: [20, 35, 15, 40, 50, 20, 30, 25, 40, 30, 50, 45] // exemplo
        }
      ],
      chart: {
        type: 'line',
        height: 250,
        sparkline: { enabled: true } // remove eixos, grid, etc.
      },
      stroke: {
        curve: 'straight',
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      },
      title: {
        text: '$135,965',
        offsetX: 10,
        style: {
          fontSize: '22px'
        }
      },
      subtitle: {
        text: this.subTitle,
        offsetX: 10,
        style: {
          fontSize: '24px'
        }
      }
    };
  }
}