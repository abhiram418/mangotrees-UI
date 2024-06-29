import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { CustomerSigninService } from './Services/customer-signin.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    CustomerSigninService 
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
