import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SigninUpPageComponent } from './signin-up-page/signin-up-page.component';
import { DiceComponent } from './dice/dice.component';

export const routes: Routes = [
    {path:'', redirectTo:'comingSoon', pathMatch:'full'},
    {path:'comingSoon', component:ComingSoonPageComponent},
    {path:'login', component:LoginPageComponent},
    {path:'signup', component:SigninUpPageComponent},
    {path:'dice', component:DiceComponent},
];
