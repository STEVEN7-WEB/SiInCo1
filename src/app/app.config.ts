import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

export const appConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
};
