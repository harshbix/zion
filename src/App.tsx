import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from '@/services/auth-context';
import { CartProvider } from '@/services/cart-context';
import { OrderProvider } from '@/services/order-context';
import { ToastProvider } from '@/services/toast-context';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <OrderProvider>
            <RouterProvider router={router} />
          </OrderProvider>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
