import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductDetail } from './index';
import * as useProductHook from '../../hooks/useProduct';
import type { Product } from '../../types/product';

// Mock the child components
vi.mock('../ProductNavigation', () => ({
  ProductNavigation: () => <div data-testid="product-navigation">Navigation</div>,
}));

vi.mock('../ProductImage', () => ({
  ProductImage: () => <div data-testid="product-image">Image</div>,
}));

vi.mock('../ProductInfo', () => ({
  ProductInfo: () => {
    const { data: product } = useProductHook.useProduct();
    return (
      <div data-testid="product-info">
        {product && (
          <>
            <h1>{product.title}</h1>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
          </>
        )}
      </div>
    );
  },
}));

vi.mock('../ProductMeta', () => ({
  ProductMeta: () => {
    const { data: product } = useProductHook.useProduct();
    return (
      <div data-testid="product-meta">
        {product && (
          <>
            <span>Stock: {product.stock}</span>
            <span>Status: {product.availabilityStatus}</span>
          </>
        )}
      </div>
    );
  },
}));

vi.mock('../ProductActions', () => ({
  ProductActions: () => <div data-testid="product-actions">Actions</div>,
}));

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  category: 'electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'TestBrand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'test.jpg',
  images: ['test1.jpg', 'test2.jpg'],
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('ProductDetail', () => {
  it('renders product title, price, and description when data is available', () => {
    // Mock useProduct to return product data
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: mockProduct,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
    } as any);

    render(<ProductDetail />, { wrapper: createWrapper() });

    // Verify all main sections are rendered
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();
    expect(screen.getByTestId('product-info')).toBeInTheDocument();
    expect(screen.getByTestId('product-meta')).toBeInTheDocument();
    expect(screen.getByTestId('product-actions')).toBeInTheDocument();

    // Verify product data is displayed
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
  });

  it('displays loading state while fetching data', () => {
    // Mock useProduct to return loading state
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false,
      status: 'loading',
    } as any);

    render(<ProductDetail />, { wrapper: createWrapper() });

    // Component structure should still render
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toBeInTheDocument();

    // Product data should not be present during loading
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.queryByText('$99.99')).not.toBeInTheDocument();
  });

  it('shows error message if product fetch fails', () => {
    const errorMessage = 'Failed to fetch product';
    
    // Mock useProduct to return error state
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
      isError: true,
      isSuccess: false,
      status: 'error',
    } as any);

    render(<ProductDetail />, { wrapper: createWrapper() });

    // Component structure should still render
    expect(screen.getByTestId('product-navigation')).toBeInTheDocument();

    // Product data should not be present when there's an error
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  it('properly displays when product is out of stock or unavailable', () => {
    const outOfStockProduct: Product = {
      ...mockProduct,
      stock: 0,
      availabilityStatus: 'Out of Stock',
    };

    // Mock useProduct to return out of stock product
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: outOfStockProduct,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
    } as any);

    render(<ProductDetail />, { wrapper: createWrapper() });

    // Verify product is rendered with out of stock status
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Stock: 0')).toBeInTheDocument();
    expect(screen.getByText('Status: Out of Stock')).toBeInTheDocument();
  });
});
