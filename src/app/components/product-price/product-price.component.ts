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
    return this.taglist?.some((tag) => tag.code === 'SaleTag') ?? false;
  }

  getBuyPrice(): string | null {
    const buy = this.allPrices?.find((p) => p.priceType === 'BUY');
    return buy?.formattedValue || null;
  }

  getPreferredPrice(): string | null {
    return (
      this.allPrices?.find((p) => p.priceType === 'TOP')?.formattedValue ||
      this.allPrices?.find((p) => p.priceType === 'UVP')?.formattedValue ||
      null
    );
  }
}
