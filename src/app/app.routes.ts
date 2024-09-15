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
import { CustomerPersonalDetailsComponent } from './Customer/customer-personal-details/customer-personal-details.component';
import { CustomerAddressComponent } from './Customer/customer-address/customer-address.component';
import { PopPageComponent } from './components/pop-page/pop-page.component';
import { AddressUpdateComponent } from './Customer/address-update/address-update.component';
import { CartPageComponent } from './Product/cart-page/cart-page.component';
import { CollectionsPageComponent } from './Product/collections-page/collections-page.component';
import { OrderPageComponent } from './Customer/order-page/order-page.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'comingSoon', component:ComingSoonPageComponent},

    {path:'home', component:HomePageComponent},
    {path:'collections', component:CollectionsPageComponent},
    {path:'product/:ProductID', component:ProductViewComponent},
    {path:'cart', component:CartPageComponent},
    {path:'review', component:ReviewDeliveryPageComponent},
    {path:'checkout', component:CheckOutPageComponent},

    {path:'signup', component:SigninUpPageComponent},
    {path:'login', component:LoginPageComponent},
    {path:'otp', component:OTPComponent},
    {path:'repassword', component:ResetPasswordComponent},

    {path:'profile', component:CustomerProfileComponent},
    {path:'details', component:CustomerPersonalDetailsComponent},
    {path:'address', component:CustomerAddressComponent},
    {path:'address-update', component:AddressUpdateComponent},
    {path:'orders', component:OrderPageComponent},
    

    {path:'nav-bar', component:NavBarComponent},    
    {path:'footer', component:FooterComponent},
    {path:'item', component:GridViewItemComponent},
    {path:'slider', component:SliderComponent},
    {path:'loader', component:LoaderComponent},
    {path:'pop-up', component:PopUpComponent},
    {path:'pop-page', component:PopPageComponent},

    
    {path:'dice', component:DiceComponent},
    
    
    {path:'test',component:TestComponent},
];
