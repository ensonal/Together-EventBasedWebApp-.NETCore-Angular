import { Route } from '@angular/router';
import { LoginComponent } from './auth-management/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './auth-management/register/register.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    // localhost:4200/register
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "home",
                component: HomeComponent
            }
        ]
    }


];
