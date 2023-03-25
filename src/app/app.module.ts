import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TruckCreateComponent } from './Components/truck-create/truck-create.component';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteCreateComponent } from './Components/route-create/route-create.component';
import { WarehouseCreateComponent } from './Components/warehouse-create/warehouse-create.component';
import { OrderCreateComponent } from './Components/order-create/order-create.component';
import { PackagingEditComponent } from './Components/packaging-edit/packaging-edit.component';
import { PackagingCreateComponent } from './Components/packaging-create/packaging-create.component';
import { RouteListComponent } from './Components/route-list/route-list.component';
import { PackagingListComponent } from './Components/packaging-list/packaging-list.component';
import { RouteEditComponent } from './Components/route-edit/route-edit.component';
import { OrderEditComponent } from './Components/order-edit/order-edit.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { WarehouseListComponent } from './Components/warehouse-list/warehouse-list.component';
import { WarehouseEditComponent } from './Components/warehouse-edit/warehouse-edit.component';
import { TruckListComponent } from './Components/truck-list/truck-list.component';
import { HomeComponent } from './Components/home/home.component';
import { DeliveryCreateComponent } from './Components/delivery-create/delivery-create.component';
import { DeliveryListComponent } from "./Components/delivery-list/delivery-list.component";
import { DeliveryEditComponent } from "./Components/delivery-edit/delivery-edit.component";
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from "@abacritt/angularx-social-login";
import { PlanningRouteComponent } from './Components/planning-route/planning-route.component';
import { NgxPaginationModule} from "ngx-pagination";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TripCreateComponent } from './Components/trip-create/trip-create.component';
import { TripListComponent } from './Components/trip-list/trip-list.component';
import { PrivateComponent } from './Components/sessions/private/private.component';
import { SignupComponent } from './Components/signup/signup.component';
import { AnonimyzeUserDataComponent } from './Components/anonimyze-user-data/anonimyze-user-data.component';
import { TermsComponent } from './Components/terms/terms.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    TruckCreateComponent,
    RouteCreateComponent,
    WarehouseCreateComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderListComponent,
    PackagingEditComponent,
    PackagingCreateComponent,
    RouteListComponent,
    PackagingListComponent,
    RouteEditComponent,
    OrderEditComponent,
    WarehouseListComponent,
    WarehouseEditComponent,
    TruckListComponent,
    HomeComponent,
    DeliveryCreateComponent,
    DeliveryListComponent,
    DeliveryEditComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    PlanningRouteComponent,
    TripCreateComponent,
    TripListComponent,
    PrivateComponent,
    SignupComponent,
    AnonimyzeUserDataComponent,
    TermsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        SocialLoginModule,
        Ng2SearchPipeModule,
        Ng2OrderModule,
        NgxPaginationModule,
        RouterModule.forRoot([
            {path: '', component: LoginComponent, pathMatch: 'full'},
            {path: 'signup', component: SignupComponent, pathMatch: 'full'},
            {path: 'sessions/private', component: PrivateComponent, pathMatch: 'full'},
            {path: 'home', component: HomeComponent, pathMatch: 'full'},
            {path: 'login', component: LoginComponent, pathMatch: 'full'},
            {path: 'trucks/create', component: TruckCreateComponent, pathMatch: 'full'},
            {path: 'routes/create', component: RouteCreateComponent, pathMatch: 'full'},
            {path: 'warehouses/create', component: WarehouseCreateComponent, pathMatch: 'full'},
            {path: 'orders/create', component: OrderCreateComponent, pathMatch: 'full'},
            {path: 'orders/edit', component: OrderEditComponent, pathMatch: 'full'},
            {path: 'orders/list', component: OrderListComponent, pathMatch: 'full'},
            {path: 'deliveries/create', component: DeliveryCreateComponent, pathMatch: 'full'},
            {path: 'deliveries/list', component: DeliveryListComponent, pathMatch: 'full'},
            {path: 'deliveries/edit', component: DeliveryEditComponent, pathMatch: 'full'},
            {path: 'packaging/edit', component: PackagingEditComponent, pathMatch: 'full'},
            {path: 'packaging/create', component: PackagingCreateComponent, pathMatch: 'full'},
            {path: 'routes/list', component: RouteListComponent, pathMatch: 'full'},
            {path: 'packaging/list', component: PackagingListComponent, pathMatch: 'full'},
            {path: 'warehouses/list', component: WarehouseListComponent, pathMatch: 'full'},
            {path: 'warehouses/edit', component: WarehouseEditComponent, pathMatch: 'full'},
            {path: 'routes/edit', component: RouteEditComponent, pathMatch: 'full'},
            {path: 'planningRoute', component: PlanningRouteComponent, pathMatch: 'full'},
            {path: 'trip/create', component: TripCreateComponent, pathMatch: 'full'},
            {path: 'users/anonimyze', component: AnonimyzeUserDataComponent, pathMatch: 'full'},
            {path: 'trip/list', component: TripListComponent, pathMatch: 'full'},
            {path: 'terms', component: TermsComponent, pathMatch: 'full' },

        ]),
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('793782258027-gsjpgbgn5sbeinnrvs06k90fe0enkh4r.apps.googleusercontent.com'),
          },
        ],
        onError: (err) => console.error(err)
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
