import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-price',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-price.component.html',
})
export class ProductPriceComponent {
  @Input() taglist: any[] = [];
  @Input() allPrices: any[] = [];
  @Input() defaultFormattedPrice: string = '';

  isOnSale(): boolean {
    return this.taglist?.some((tag) => tag.code === 'SaleTag');
  }

  getBuyPrice(): string | null {
    const buy = this.allPrices?.find((p) => p.priceType === 'BUY');
    return buy?.formattedValue || null;
  }

  getUvpPrice(): string | null {
    const uvp = this.allPrices?.find(
      (p) => p.priceType === 'UVP' || p.priceType === 'TOP'
    );
    return uvp?.formattedValue || null;
  }
}
