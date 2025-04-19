import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
  { path: '', component: ProductPageComponent },
  { path: 'products/page/:page', component: ProductPageComponent },
];
