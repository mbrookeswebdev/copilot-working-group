import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { ProductActions } from './index';
import * as useProductHook from '../../hooks/useProduct';
import * as useCartContextHook from '../../contexts/useCartContext';
import type { Product } from '../../types/product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'Test description',
  category: 'electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'TestBrand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'test.jpg',
  images: ['test1.jpg'],
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

describe('ProductActions', () => {
  const mockAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useCartContextHook, 'useCartContext').mockReturnValue({
      items: [],
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      totalItems: 0,
      totalPrice: 0,
    });
  });

  it('renders Add to Cart button when product is loaded', () => {
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('shows loading state when product is being fetched', () => {
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      isSuccess: false,
      status: 'pending',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });

  it('shows error message when product fetch fails', () => {
    const errorMessage = 'Failed to fetch product';
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error(errorMessage),
      isSuccess: false,
      status: 'error',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    expect(screen.getByText(/unable to load product details/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('calls addToCart when button is clicked', async () => {
    const user = userEvent.setup();
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('shows success feedback after adding to cart', async () => {
    const user = userEvent.setup();
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    // Should show success message
    expect(screen.getByRole('button', { name: /item added to cart/i })).toBeInTheDocument();
    expect(screen.getByText(/✓ added to cart/i)).toBeInTheDocument();
  });

  it('shows success message temporarily after adding to cart', async () => {
    const user = userEvent.setup();
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: true,
      status: 'success',
    } as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button', { name: /add to cart/i });
    await user.click(button);

    // Should show success message
    expect(screen.getByText(/✓ added to cart/i)).toBeInTheDocument();
    
    // Message should disappear after 2 seconds
    await waitFor(
      () => {
        expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('does not call addToCart when product is undefined', () => {
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
      status: 'pending',
    } as unknown as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it('handles error with no error message gracefully', () => {
    vi.spyOn(useProductHook, 'useProduct').mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: null,
      isSuccess: false,
      status: 'error',
    } as unknown as UseQueryResult<Product, Error>);

    render(<ProductActions />, { wrapper: createWrapper() });

    expect(screen.getByText(/unable to load product details/i)).toBeInTheDocument();
    expect(screen.getByText(/unknown error/i)).toBeInTheDocument();
  });
});
