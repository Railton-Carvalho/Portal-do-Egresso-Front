import { NgModule } from "@angular/core";
import { NgApexchartsModule } from "ng-apexcharts";
import { DistributedColumnsComponent } from './reports-elements/distributed-columns/distributed-columns.component';
import { SimplePieComponent } from "./reports-elements/simple-pie/simple-pie.component";

import { ReportsComponent } from "./reports.component";
import { ProfitChartComponent } from './reports-elements/profit-chart/profit-chart.component';

@NgModule({
    imports: [
      NgApexchartsModule,  
    ],exports: [
        NgApexchartsModule,
        SimplePieComponent,
        DistributedColumnsComponent,
        ProfitChartComponent
        
    ], declarations: [
        ReportsComponent,
        SimplePieComponent,
        DistributedColumnsComponent,
        ProfitChartComponent
    ],
  })

export class ReportsModule{

}