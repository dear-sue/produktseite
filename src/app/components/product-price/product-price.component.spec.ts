import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductPriceComponent } from './product-price.component';
import { Price, Tag } from '../../models/product.model';

describe('ProductPriceComponent', () => {
  let component: ProductPriceComponent;
  let fixture: ComponentFixture<ProductPriceComponent>;

  const mockBuyPrice: Price = {
    priceType: 'BUY',
    value: 99.99,
    currencyIso: 'EUR',
    formattedValue: '99,99 €',
  };
  const mockUvpPrice: Price = {
    priceType: 'UVP',
    value: 129.99,
    currencyIso: 'EUR',
    formattedValue: '129,99 €',
  };
  const mockTopPrice: Price = {
    priceType: 'TOP',
    value: 119.99,
    currencyIso: 'EUR',
    formattedValue: '119,99 €',
  };
  const mockSaleTag: Tag = { code: 'SaleTag', description: 'Sale' };
  const mockOtherTag: Tag = { code: 'NewTag', description: 'New' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPriceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPriceComponent);
    component = fixture.componentInstance;

    component.allPrices = [mockBuyPrice, mockUvpPrice];
    component.taglist = [mockOtherTag];
    component.defaultFormattedPrice = 'Default Price';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isOnSale', () => {
    it('should return true if SaleTag is present in taglist', () => {
      component.taglist = [mockOtherTag, mockSaleTag];
      expect(component.isOnSale()).toBeTrue();
    });

    it('should return false if SaleTag is not present in taglist', () => {
      component.taglist = [mockOtherTag];
      expect(component.isOnSale()).toBeFalse();
    });

    it('should return false if taglist is empty', () => {
      component.taglist = [];
      expect(component.isOnSale()).toBeFalse();
    });

    it('should return false if taglist is undefined', () => {
      component.taglist = undefined as any;
      expect(component.isOnSale()).toBeFalse();
    });
  });

  describe('getBuyPrice', () => {
    it('should return formatted BUY price if present', () => {
      component.allPrices = [mockUvpPrice, mockBuyPrice];
      expect(component.getBuyPrice()).toBe(mockBuyPrice.formattedValue);
    });

    it('should return null if BUY price is not present', () => {
      component.allPrices = [mockUvpPrice];
      expect(component.getBuyPrice()).toBeNull();
    });

    it('should return null if allPrices is empty', () => {
      component.allPrices = [];
      expect(component.getBuyPrice()).toBeNull();
    });
  });

  describe('getPreferredPrice', () => {
    it('should return formatted UVP price if present', () => {
      component.allPrices = [mockBuyPrice, mockUvpPrice];
      expect(component.getPreferredPrice()).toBe(mockUvpPrice.formattedValue);
    });

    it('should return formatted TOP price if present and UVP is not', () => {
      component.allPrices = [mockBuyPrice, mockTopPrice];
      expect(component.getPreferredPrice()).toBe(mockTopPrice.formattedValue);
    });

    it('should prioritize TOP price if both UVP and TOP are present', () => {
      component.allPrices = [mockBuyPrice, mockUvpPrice, mockTopPrice];
      expect(component.getPreferredPrice()).toBe(mockTopPrice.formattedValue);
    });

    it('should return null if neither UVP nor TOP price is present', () => {
      component.allPrices = [mockBuyPrice];
      expect(component.getPreferredPrice()).toBeNull();
    });

    it('should return null if allPrices is empty', () => {
      component.allPrices = [];
      expect(component.getPreferredPrice()).toBeNull();
    });
  });

  describe('Template Rendering', () => {
    it('should display the BUY price in secondary color and UVP price crossed out when on sale', () => {
      component.allPrices = [mockBuyPrice, mockUvpPrice];
      component.taglist = [mockSaleTag];
      fixture.detectChanges();

      const buyPriceElement = fixture.debugElement.query(
        By.css('span.text-secondary.font-bold')
      );
      const uvpElement = fixture.debugElement.query(
        By.css('span.text-sm.text-gray-500.line-through')
      );

      expect(buyPriceElement).toBeTruthy();
      expect(buyPriceElement.nativeElement.textContent.trim()).toBe(
        mockBuyPrice.formattedValue
      );
      expect(uvpElement).toBeTruthy();
      expect(uvpElement.nativeElement.textContent.trim()).toBe(
        mockUvpPrice.formattedValue
      );

      const regularPriceElement = fixture.debugElement.query(
        By.css('p.text-primary.font-bold')
      );
      expect(regularPriceElement).toBeFalsy();
    });

    it('should display the defaultFormattedPrice in primary color when not on sale', () => {
      component.allPrices = [mockBuyPrice, mockUvpPrice];
      component.taglist = [mockOtherTag];
      component.defaultFormattedPrice = mockBuyPrice.formattedValue;
      fixture.detectChanges();

      const regularPriceElement = fixture.debugElement.query(
        By.css('p.text-primary.font-bold')
      );
      expect(regularPriceElement).toBeTruthy();
      expect(regularPriceElement.nativeElement.textContent.trim()).toBe(
        mockBuyPrice.formattedValue
      );

      const buyPriceSaleElement = fixture.debugElement.query(
        By.css('span.text-secondary.font-bold')
      );
      const uvpSaleElement = fixture.debugElement.query(
        By.css('span.text-sm.text-gray-500.line-through')
      );
      expect(buyPriceSaleElement).toBeFalsy();
      expect(uvpSaleElement).toBeFalsy();
    });

    it('should display the crossed-out TOP price instead of UVP when on sale and UVP is missing', () => {
      component.allPrices = [mockBuyPrice, mockTopPrice];
      component.taglist = [mockSaleTag];
      fixture.detectChanges();

      const buyPriceElement = fixture.debugElement.query(
        By.css('span.text-secondary.font-bold')
      );
      const topElement = fixture.debugElement.query(
        By.css('span.text-sm.text-gray-500.line-through')
      );

      expect(buyPriceElement).toBeTruthy();
      expect(buyPriceElement.nativeElement.textContent.trim()).toBe(
        mockBuyPrice.formattedValue
      );
      expect(topElement).toBeTruthy();
      expect(topElement.nativeElement.textContent.trim()).toBe(
        mockTopPrice.formattedValue
      );
    });
  });
});
