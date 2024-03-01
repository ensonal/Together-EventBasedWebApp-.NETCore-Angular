import { Route } from '@angular/router';
import { LoginComponent } from './auth-management/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { RegisterComponent } from './auth-management/register/register.component';

export const appRoutes: Route[] = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "registers",
                component: RegisterComponent
            }
        ]
    }


];
