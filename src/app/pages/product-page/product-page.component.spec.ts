import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By, Title } from '@angular/platform-browser';
import { ProductPageComponent } from './product-page.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { Product, Price } from '../../models/product.model';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template:
    '<div data-testid="mock-product-list">Displayed {{ products.length }} products</div>',
})
class MockProductListComponent {
  @Input() products: Product[] = [];
  @Input() baseUrl: string = 'https://www.deichmann.com/de-de';
}

const createMockProduct = (
  code: string,
  name: string,
  brand: string,
  description: string,
  priceValue: number,
): Product => {
  const price: Price = {
    value: priceValue,
    currencyIso: 'EUR',
    formattedValue: `${priceValue} €`,
    priceType: 'BUY',
  };
  return {
    code,
    articleNumber: parseInt(code.substring(1)),
    name,
    brandName: brand,
    brand: brand.toLowerCase(),
    price,
    allPrices: [price],
    taglist: [],
    images: [],
    description,
    baseProduct: `base-${code}`,
    manufacturerAID: `aid-${code}`,
    stock: { stockLevelStatus: 'inStock' },
    topLevelCategory: { code: 'cat', codeAlternative: 'alt', url: '/cat' },
    url: `/${code}`,
    variantMatrix: [],
    volumePricesFlag: false,
    availableColorIcons: [],
  };
};

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let titleService: Title;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    createMockProduct(
      'P1',
      'Sneaker Alpha',
      'Nike',
      'Comfortable running sneaker',
      120,
    ),
    createMockProduct('P2', 'Boot Beta', 'Adidas', 'Stylish leather boot', 180),
    createMockProduct('P3', 'Sandal Gamma', 'Nike', 'Light summer sandal', 75),
    ...Array.from({ length: 12 }, (_, i) =>
      createMockProduct(
        `PX${i + 1}`,
        `Other Sneaker ${i + 1}`,
        'Puma',
        'Generic description',
        90 + i,
      ),
    ),
  ];

  const totalMockProducts = mockProducts.length;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    await TestBed.configureTestingModule({
      imports: [ProductPageComponent, FormsModule],
      providers: [
        Title,
        { provide: ProductService, useValue: mockProductService },
      ],
    })
      .overrideComponent(ProductPageComponent, {
        remove: { imports: [ProductListComponent] },
        add: { imports: [MockProductListComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    spyOn(titleService, 'setTitle').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization (ngOnInit)', () => {
    it('should set the page title using Title service', () => {
      expect(titleService.setTitle).toHaveBeenCalledWith('Sneaker');
    });

    it('should fetch products using ProductService on init', () => {
      expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
      expect(component.products.length).toBe(totalMockProducts);
      expect(component.filteredProducts.length).toBe(totalMockProducts);
    });
  });

  describe('Search Functionality', () => {
    it('should filter products by brand (case-insensitive)', fakeAsync(() => {
      component.searchTerm = 'NIKE';
      component.onSearchChange();
      tick();
      fixture.detectChanges();
      expect(component.filteredProducts.length).toBe(2);
      expect(
        component.filteredProducts.some((p) => p.brandName === 'Nike'),
      ).toBeTrue();
      expect(component.currentPage).toBe(1);
    }));

    it('should filter products by description (case-insensitive)', fakeAsync(() => {
      component.searchTerm = 'leather';
      component.onSearchChange();
      tick();
      fixture.detectChanges();
      expect(component.filteredProducts.length).toBe(1);
      expect(component.filteredProducts[0].description).toContain('leather');
      expect(component.currentPage).toBe(1);
    }));

    it('should show all products if search term is empty', fakeAsync(() => {
      component.searchTerm = 'alpha';
      component.onSearchChange();
      tick();
      fixture.detectChanges();

      component.searchTerm = '   ';
      component.onSearchChange();
      tick();
      fixture.detectChanges();
      expect(component.filteredProducts.length).toBe(totalMockProducts);
      expect(component.currentPage).toBe(1);
    }));

    it('should handle search terms returning no results', fakeAsync(() => {
      component.searchTerm = 'nonexistentXYZ';
      component.onSearchChange();
      tick();
      fixture.detectChanges();
      expect(component.filteredProducts.length).toBe(0);
      expect(component.currentPage).toBe(1);
    }));

    it('should call onSearchChange when search input changes', fakeAsync(() => {
      spyOn(component, 'onSearchChange');
      const searchInput = fixture.debugElement.query(
        By.css('input[type="text"]'),
      ).nativeElement;
      searchInput.value = 'test';
      searchInput.dispatchEvent(new Event('input'));
      tick();
      expect(component.onSearchChange).toHaveBeenCalled();
    }));
  });

  describe('Pagination Functionality', () => {
    beforeEach(() => {
      component.itemsPerPage = 12;
      fixture.detectChanges();
    });

    it('should calculate total pages correctly', () => {
      expect(component.totalPages.length).toBe(
        Math.ceil(totalMockProducts / component.itemsPerPage),
      );
      expect(component.totalPages).toEqual([1, 2]);
    });

    it('should return the correct slice of products for the current page (page 1)', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      const paginated = component.paginatedProducts;
      expect(paginated.length).toBe(12);
      expect(paginated[0].code).toBe(mockProducts[0].code);
      expect(paginated[11].code).toBe(mockProducts[11].code);
    });

    it('should return the correct slice of products for the current page (page 2)', () => {
      component.currentPage = 2;
      fixture.detectChanges();
      const paginated = component.paginatedProducts;
      expect(paginated.length).toBe(totalMockProducts - component.itemsPerPage);
      expect(paginated[0].code).toBe(mockProducts[12].code);
      expect(paginated[2].code).toBe(mockProducts[14].code);
    });

    it('should change the current page when changePage is called', () => {
      component.changePage(2);
      fixture.detectChanges();
      expect(component.currentPage).toBe(2);
      const paginated = component.paginatedProducts;
      expect(paginated.length).toBe(3);
      expect(paginated[0].code).toBe(mockProducts[12].code);
    });

    it('should reset to page 1 when search results change', fakeAsync(() => {
      component.changePage(2);
      fixture.detectChanges();
      expect(component.currentPage).toBe(2);

      component.searchTerm = 'alpha';
      component.onSearchChange();
      tick();
      fixture.detectChanges();

      expect(component.currentPage).toBe(1);
      expect(component.filteredProducts.length).toBe(1);
      expect(component.paginatedProducts.length).toBe(1);
    }));

    it('should render the correct number of pagination buttons', () => {
      const pageButtons = fixture.debugElement.queryAll(
        By.css('div.pagination button'),
      );
      const numberButtons = pageButtons.filter(
        (btn) => !isNaN(parseInt(btn.nativeElement.textContent.trim())),
      );
      expect(numberButtons.length).toBe(2);
    });

    it('should call changePage when a pagination button is clicked', () => {
      spyOn(component, 'changePage');
      const pageButtons = fixture.debugElement.queryAll(
        By.css('div.pagination button'),
      );
      const page2Button = pageButtons.find(
        (btn) => btn.nativeElement.textContent.trim() === '2',
      );
      expect(page2Button).toBeTruthy();
      if (page2Button) {
        page2Button.nativeElement.click();
        expect(component.changePage).toHaveBeenCalledWith(2);
      }
    });

    it('should pass paginated products to the mock product list component', () => {
      component.currentPage = 1;
      fixture.detectChanges();
      const mockListComponent = fixture.debugElement.query(
        By.directive(MockProductListComponent),
      ).componentInstance as MockProductListComponent;
      expect(mockListComponent.products.length).toBe(12);

      component.currentPage = 2;
      fixture.detectChanges();
      const mockListComponentPage2 = fixture.debugElement.query(
        By.directive(MockProductListComponent),
      ).componentInstance as MockProductListComponent;
      expect(mockListComponentPage2.products.length).toBe(3);
    });
  });
});
