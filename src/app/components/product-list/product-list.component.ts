import { Component, Input } from '@angular/core';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductPriceComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  @Input() products: Product[] = [];
}
