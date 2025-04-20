import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductListComponent } from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductListComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 12;

  @Input() title: string = 'Sneaker';
  @Input() baseUrl: string = 'https://www.deichmann.com/de-de';

  constructor(private http: HttpClient, private titleService: Title) {}

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  get totalPages(): number[] {
    const count = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1);
  }

  ngOnInit(): void {
    const pageTitle = this.title || 'Sneaker';
    this.titleService.setTitle(pageTitle);
    this.http
      .get<{ products: Product[] }>('/assets/products.json')
      .subscribe((data) => {
        this.products = data.products;
        this.filteredProducts = [...this.products];
      });
  }

  onSearchChange(): void {
    const term = this.searchTerm.trim().toLowerCase();

    if (term.length > 0) {
      this.filteredProducts = this.products.filter((product) => {
        const matchesBasic =
          product.name.toLowerCase().includes(term) ||
          product.brandName.toLowerCase().includes(term) ||
          product.description?.toLowerCase().includes(term);

        const matchesColor =
          product.availableColorIcons?.some((color) =>
            color.altText.toLowerCase().includes(term)
          ) ?? false;

        const matchesSize =
          product.variantMatrix?.some((variant) =>
            variant.sizeMap?.some(
              (size) =>
                size.sizeSystem?.code === 'EU' &&
                size.value.toLowerCase().includes(term)
            )
          ) ?? false;

        return matchesBasic || matchesColor || matchesSize;
      });
    } else {
      this.filteredProducts = [...this.products];
    }

    this.currentPage = 1;
  }

  clearSearch() {
    this.searchTerm = '';
    this.onSearchChange();
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
