import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FareDashboardComponent} from './fare-dashboard/fare-dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: FareDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
