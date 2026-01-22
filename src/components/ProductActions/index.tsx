import { useState } from 'react';
import { useProduct } from '../../hooks/useProduct';
import { useCartContext } from '../../contexts/useCartContext';
import { Button } from '../ui/Button';
import styles from './ProductActions.module.css';

export const ProductActions = () => {
  const { data: product, isLoading, isError, error } = useProduct();
  const { addToCart } = useCartContext();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }
  };

  // Show error state if product fetch failed
  if (isError) {
    return (
      <div className={styles.actions}>
        <div className={styles.error}>
          Unable to load product details: {error?.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.actions}>
      <Button
        fullWidth
        onClick={handleAddToCart}
        disabled={isLoading || !product}
        aria-label={justAdded ? 'Item added to cart' : 'Add to cart'}
      >
        {isLoading ? 'Loading...' : justAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </Button>
    </div>
  );
};
