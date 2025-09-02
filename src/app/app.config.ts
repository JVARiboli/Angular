import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { LucideAngularModule, Home, Package, ShoppingBag, Store, PlusCircle, FilePenLine, Trash2 } from 'lucide-angular';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({ Home, Package, ShoppingBag, Store, PlusCircle, FilePenLine, Trash2 }))
  ]
};
