import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import Product from '@/pages/Product';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Account from '@/pages/Account';
import OrderTracking from '@/pages/OrderTracking';
import Blog from '@/pages/Blog';
import SignIn from '@/pages/SignIn';
import Admin from '@/pages/Admin';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminProducts from '@/pages/AdminProducts';
import AdminMedia from '@/pages/AdminMedia';
import AdminReviews from '@/pages/AdminReviews';
import AdminSettings from '@/pages/AdminSettings';
import AdminBlog from '@/pages/AdminBlog';

// New Pages
import Categories from '@/pages/Categories';
import Collections from '@/pages/Collections';
import FAQ from '@/pages/FAQ';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

import AdminGuard from '@/components/AdminGuard';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PublicLayout = () => (
  <>
    <Navbar />
    <div className="pt-20">
      <Outlet />
    </div>
    <Footer />
  </>
);

const AdminLayout = () => (
  <div className="admin-layout-container">
    <Outlet />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'account', element: <Account /> },
      { path: 'order-tracking', element: <OrderTracking /> },
      { path: 'blog', element: <Blog /> },
      { path: 'categories', element: <Categories /> },
      { path: 'collections', element: <Collections /> },
      { path: 'about', element: <About /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'contact', element: <Contact /> },
      { path: 'sign-in', element: <SignIn /> },
    ]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Admin /> },
      {
        element: <AdminGuard />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'products', element: <AdminProducts /> },
          { path: 'media', element: <AdminMedia /> },
          { path: 'reviews', element: <AdminReviews /> },
          { path: 'settings', element: <AdminSettings /> },
          { path: 'blog', element: <AdminBlog /> },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);
