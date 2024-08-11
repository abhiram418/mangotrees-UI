import { Routes } from '@angular/router';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { SigninUpPageComponent } from './Customer/signin-up-page/signin-up-page.component';
import { DiceComponent } from './personal/dice/dice.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { TestComponent } from './test/test.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GridViewItemComponent } from './components/grid-view-item/grid-view-item.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoginPageComponent } from './Customer/login-page/login-page.component';
import { HomePageComponent } from './Product/home-page/home-page.component';
import { OTPComponent } from './Customer/otp/otp.component';
import { ResetPasswordComponent } from './Customer/reset-password/reset-password.component';
import { ProductViewComponent } from './Product/product-view/product-view.component';
import { CheckOutPageComponent } from './Product/check-out-page/check-out-page.component';
import { ReviewDeliveryPageComponent } from './Product/review-delivery-page/review-delivery-page.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';

export const routes: Routes = [
    {path:'', redirectTo:'profile', pathMatch:'full'},
    {path:'comingSoon', component:ComingSoonPageComponent},

    {path:'home', component:HomePageComponent},
    {path:'product/:ProductID', component:ProductViewComponent},
    {path:'review', component:ReviewDeliveryPageComponent},
    {path:'checkout', component:CheckOutPageComponent},

    {path:'signup', component:SigninUpPageComponent},
    {path:'login', component:LoginPageComponent},
    {path:'otp', component:OTPComponent},
    {path:'repassword', component:ResetPasswordComponent},

    {path:'profile', component:CustomerProfileComponent},
    

    {path:'nav-bar', component:NavBarComponent},    
    {path:'footer', component:FooterComponent},
    {path:'item', component:GridViewItemComponent},
    {path:'slider', component:SliderComponent},
    {path:'loader', component:LoaderComponent},
    {path:'pop-up', component:PopUpComponent},

    
    {path:'dice', component:DiceComponent},
    
    
    {path:'test',component:TestComponent},
];
