import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductListComponent } from './product-list.component';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { Product, Price, Tag } from '../../models/product.model'; // Import model
import { Component, Input } from '@angular/core'; // Import for mock component

// Create a mock ProductPriceComponent to isolate the ProductListComponent tests
@Component({
  selector: 'app-product-price',
  standalone: true,
  template: '<div data-testid="mock-product-price"></div>', // Simple template for the mock
})
class MockProductPriceComponent {
  @Input() taglist: Tag[] = [];
  @Input() allPrices: Price[] = [];
  @Input() defaultFormattedPrice: string = '';
}

// Helper function to create mock products
const createMockProduct = (
  code: string,
  name: string,
  priceValue: number,
  tags: Tag[] = [],
  allPricesList: Price[] = [],
): Product => {
  const price: Price = {
    value: priceValue,
    currencyIso: 'EUR',
    formattedValue: `${priceValue} €`,
    priceType: 'BUY',
  };
  const dummyImage = {
    format: 'product',
    imageType: 'PRIMARY',
    url: `/images/mock-${code}.jpg`,
  };
  const dummyImage2 = {
    format: 'product',
    imageType: 'PRIMARY',
    url: `/images/mock-${code}-2.jpg`,
  };
  const dummyColorIcon = {
    code: 'color1',
    altText: 'Mock Color',
    url: '/icons/mock-color.svg',
  };
  return {
    code: code,
    articleNumber: parseInt(code.substring(1)),
    name: name,
    brandName: 'Brand',
    brand: 'brand',
    price: price,
    allPrices: allPricesList.length > 0 ? allPricesList : [price],
    taglist: tags,
    images: [dummyImage, dummyImage2],
    availableColorIcons: [dummyColorIcon],
    description: `Desc ${name}`,
    baseProduct: `base-${code}`,
    manufacturerAID: `aid-${code}`,
    stock: { stockLevelStatus: 'inStock' },
    topLevelCategory: { code: 'cat', codeAlternative: 'alt', url: '/cat' },
    url: `/${code}`,
    variantMatrix: [],
    volumePricesFlag: false,
  };
};

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  // Sample mock products
  const mockProducts: Product[] = [
    createMockProduct(
      'P1',
      'Product 1',
      100,
      [{ code: 'SaleTag', description: 'Sale' }],
      [
        {
          value: 100,
          currencyIso: 'EUR',
          formattedValue: '100 €',
          priceType: 'BUY',
        },
        {
          value: 120,
          currencyIso: 'EUR',
          formattedValue: '120 €',
          priceType: 'UVP',
        },
      ],
    ),
    createMockProduct('P2', 'Product 2', 200),
    createMockProduct('P3', 'Product 3', 300),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    })

      .overrideComponent(ProductListComponent, {
        remove: { imports: [ProductPriceComponent] },
        add: { imports: [MockProductPriceComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    component.baseUrl = 'https://www.deichmann.com/de-de';
    component.products = mockProducts;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list item for each product', () => {
    const productItems = fixture.debugElement.queryAll(
      By.css('a.product-card'),
    );
    expect(productItems.length).toBe(mockProducts.length);
  });

  it('should render the mock product price component for each product', () => {
    const mockPriceComponents = fixture.debugElement.queryAll(
      By.css('app-product-price'),
    );
    expect(mockPriceComponents.length).toBe(mockProducts.length);
  });

  it('should pass the correct data to each mock product price component', () => {
    const mockPriceComponentInstances = fixture.debugElement
      .queryAll(By.directive(MockProductPriceComponent))
      .map((el) => el.componentInstance as MockProductPriceComponent);

    expect(mockPriceComponentInstances.length).toBe(mockProducts.length);

    mockPriceComponentInstances.forEach((priceComp, index) => {
      const product = mockProducts[index];
      expect(priceComp.allPrices).toEqual(product.allPrices);
      expect(priceComp.taglist).toEqual(product.taglist);
      expect(priceComp.defaultFormattedPrice).toBe(
        product.price.formattedValue,
      );
    });
  });

  it('should render product name and brand', () => {
    const productItems = fixture.debugElement.queryAll(
      By.css('a.product-card'),
    );
    productItems.forEach((item, index) => {
      const product = mockProducts[index];
      const brandElement = item.query(By.css('h2.font-semibold'));
      const nameElement = item.query(By.css('h2.truncate'));

      expect(brandElement).toBeTruthy();
      expect(brandElement.nativeElement.textContent).toContain(
        product.brandName,
      );
      expect(nameElement).toBeTruthy();
      expect(nameElement.nativeElement.textContent).toContain(product.name);
    });
    expect(productItems.length).toBe(mockProducts.length);
  });

  it('should render the correct url for the a element', () => {
    const anchorElements = fixture.debugElement.queryAll(
      By.css('a.product-card'),
    );

    expect(anchorElements.length).toBe(mockProducts.length);

    anchorElements.forEach((el, index) => {
      const anchor: HTMLAnchorElement = el.nativeElement;
      const expectedHref =
        'https://www.deichmann.com/de-de' + mockProducts[index].url;
      expect(anchor.href).toBe(expectedHref);
    });
  });
});
