import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';

export const routes: Routes = [
    {path:'',redirectTo:'comingSoon',pathMatch:'full'},
    {path:'comingSoon',component:ComingSoonPageComponent}
];
