import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TruckCreateComponent} from "./Components/truck-create/truck-create.component";
import {RouteCreateComponent} from "./Components/route-create/route-create.component";
import {OrderCreateComponent} from './Components/order-create/order-create.component';
import {WarehouseCreateComponent} from './Components/warehouse-create/warehouse-create.component';
import {WarehouseEditComponent} from './Components/warehouse-edit/warehouse-edit.component';
import {WarehouseListComponent} from './Components/warehouse-list/warehouse-list.component';
import {PackagingEditComponent} from './Components/packaging-edit/packaging-edit.component';
import {PackagingCreateComponent} from './Components/packaging-create/packaging-create.component';
import {PackagingListComponent} from './Components/packaging-list/packaging-list.component';
import {RouteListComponent} from "./Components/route-list/route-list.component";
import {RouteEditComponent} from "./Components/route-edit/route-edit.component";
import {OrderEditComponent} from './Components/order-edit/order-edit.component';
import {OrderListComponent} from './Components/order-list/order-list.component';
import {TruckListComponent} from "./Components/truck-list/truck-list.component";
import {HomeComponent} from "./Components/home/home.component";
import {DeliveryCreateComponent} from "./Components/delivery-create/delivery-create.component";
import {DeliveryListComponent} from "./Components/delivery-list/delivery-list.component";
import {DeliveryEditComponent} from "./Components/delivery-edit/delivery-edit.component";
import {LoginComponent} from "./Components/login/login.component";
import {PlanningRouteComponent} from "./Components/planning-route/planning-route.component";
import {TripCreateComponent} from "./Components/trip-create/trip-create.component";
import {TripListComponent} from "./Components/trip-list/trip-list.component";
import {PrivateComponent} from "./Components/sessions/private/private.component";
import {SignupComponent} from "./Components/signup/signup.component";
import {AnonimyzeUserDataComponent} from "./Components/anonimyze-user-data/anonimyze-user-data.component";
import {TermsComponent} from "./Components/terms/terms.component";

const routes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  {path: 'home', component: HomeComponent},
  {path: 'sessions/private', component: PrivateComponent},
  {path: 'trucks/create', component: TruckCreateComponent},
  {path: 'trucks/list', component: TruckListComponent},
  {path: 'routes/create', component: RouteCreateComponent},
  {path: 'routes/list', component: RouteListComponent},
  {path: 'routes/edit', component: RouteEditComponent},
  {path: 'warehouses/create', component: WarehouseCreateComponent},
  {path: 'warehouses/edit', component: WarehouseEditComponent},
  {path: 'warehouses/list', component: WarehouseListComponent},
  {path: 'orders/create', component: OrderCreateComponent},
  {path: 'orders/edit', component: OrderEditComponent},
  {path: 'orders/list', component: OrderListComponent},
  {path: 'packaging/edit', component: PackagingEditComponent},
  {path: 'packaging/create', component: PackagingCreateComponent},
  {path: 'packaging/list', component: PackagingListComponent},
  {path: 'deliveries/create', component: DeliveryCreateComponent},
  {path: 'deliveries/list', component: DeliveryListComponent},
  {path: 'deliveries/edit', component: DeliveryEditComponent},
  {path: 'planningRoute', component: PlanningRouteComponent},
  {path: 'trip/create', component: TripCreateComponent},
  {path: 'trip/list', component: TripListComponent},
  {path: 'users/anonimyze', component: AnonimyzeUserDataComponent },
  {path: 'terms', component: TermsComponent },

  {path: "**", redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
