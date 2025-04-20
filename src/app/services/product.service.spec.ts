import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products from the API via GET', () => {
    const dummyProducts: Product[] = [
      {
        code: 'P1',
        articleNumber: 1,
        name: 'Product A',
        brandName: 'Brand X',
        brand: 'brand-x',
        price: {
          value: 100,
          currencyIso: 'EUR',
          formattedValue: '100 €',
          priceType: 'BUY',
        },
        allPrices: [
          {
            value: 100,
            currencyIso: 'EUR',
            formattedValue: '100 €',
            priceType: 'BUY',
          },
        ],
        taglist: [],
        images: [{ format: 'any', imageType: 'PRIMARY', url: 'img1' }],
        description: 'Desc A',
        baseProduct: 'base-a',
        manufacturerAID: 'aid-a',
        stock: { stockLevelStatus: 'inStock' },
        topLevelCategory: { code: 'cat', codeAlternative: 'alt', url: '/cat' },
        url: '/p1',
        variantMatrix: [],
        volumePricesFlag: false,
        availableColorIcons: [],
      },
      {
        code: 'P2',
        articleNumber: 2,
        name: 'Product B',
        brandName: 'Brand Y',
        brand: 'brand-y',
        price: {
          value: 200,
          currencyIso: 'EUR',
          formattedValue: '200 €',
          priceType: 'BUY',
        },
        allPrices: [
          {
            value: 200,
            currencyIso: 'EUR',
            formattedValue: '200 €',
            priceType: 'BUY',
          },
        ],
        taglist: [],
        images: [{ format: 'any', imageType: 'PRIMARY', url: 'img2' }],
        description: 'Desc B',
        baseProduct: 'base-b',
        manufacturerAID: 'aid-b',
        stock: { stockLevelStatus: 'inStock' },
        topLevelCategory: { code: 'cat', codeAlternative: 'alt', url: '/cat' },
        url: '/p2',
        variantMatrix: [],
        volumePricesFlag: false,
        availableColorIcons: [],
      },
    ];

    service.getProducts().subscribe((response) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('/assets/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should handle HTTP errors when fetching products', () => {
    const errorMessage = 'Failed to load products';
    const status = 500;
    const statusText = 'Server Error';

    service.getProducts().subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error) => {
        expect(error.status).toEqual(status);
        expect(error.statusText).toEqual(statusText);
      },
    });

    const req = httpMock.expectOne('/assets/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status, statusText });
  });
});
