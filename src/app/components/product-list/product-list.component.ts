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
  @Input() baseUrl!: string;

  getPreviewImage(images: any[]): string {
    const preview = images.find((img) => img.format === 'preview');
    return preview?.url || images[0]?.url || 'assets/fallback.jpg';
  }

  getSaleTag(taglist: any[]): { description: string; style: string } | null {
    if (!taglist || taglist.length === 0) return null;

    const tag = taglist.find((t) => t.code !== 'PromotedCategoryTag');
    if (!tag) return null;

    if (tag.code.toLowerCase().includes('pricereduction')) {
      return {
        description: tag.description,
        style: 'bg-secondary text-white',
      };
    }

    const whiteTags = [
      'SizeInformationTagXxl',
      'NewTag',
      'SustainableTag',
      'OnlineExclusiveTag',
    ];

    if (whiteTags.includes(tag.code)) {
      return {
        description: tag.description,
        style: 'bg-white text-black',
      };
    }

    return null;
  }
}
