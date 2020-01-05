import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FareDashboardComponent} from './fare-dashboard/fare-dashboard.component';
import {StatisticDashboardComponent} from './statistic-dashboard/statistic-dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FareDashboardComponent},
  {path: 'statistic', component: StatisticDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
