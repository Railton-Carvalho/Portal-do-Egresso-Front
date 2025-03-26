import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ReportsService } from '../../../../services/reports.service';

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
  
  public chartOptions!: ChartOptions;

  constructor(private reportsService: ReportsService) {}
  

  ngOnInit() {

    this.reportsService.getGraficoEgressosPorCurso().subscribe(
      {
        next: (response) => {

          console.log(response)

          this.chartOptions = {
            series: response.series,
            chart: {
              width: 470,
              type: "pie"
            },
            labels: response.labels,
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
    )

  }

}
