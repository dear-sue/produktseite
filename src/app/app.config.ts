import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([
      { path: '', component: ProductPageComponent },
      { path: 'products/page/:page', component: ProductPageComponent },
    ]),
    provideHttpClient(),
    FormsModule,
  ],
};
