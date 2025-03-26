import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexAxisChartSeries
} from "ng-apexcharts";
import { ReportsService } from '../../../../services/reports.service';

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

  public chartOptions!: ChartOptions;

  constructor(private reportsService: ReportsService) {

    this.reportsService.getGraficoTopSalarios().subscribe(
      {
        next: (response) => {

          console.log(response)

          this.chartOptions = {
            series: [
              {
                name: "Top Cursos",
                data: response.series
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
              categories: response.categories
            }
          };

        }
      }
    )

    
  }
}
