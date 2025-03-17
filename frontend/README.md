# Frontend Documentation

## Overview

The frontend is a React application built with Vite, using modern web technologies and best practices for a responsive and user-friendly interface.

## Features

- Modern React with Hooks
- Shadcn UI components
- Redux Toolkit for state management
- TailwindCSS for styling
- Form handling with Formik
- API integration with React Query
- Responsive design
- Dark mode support
- TypeScript support
- Unit testing with Jest

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # shadcn components
│   │   ├── atoms/     # Basic building blocks
│   │   ├── molecules/ # Combinations of atoms
│   │   ├── organisms/ # Complex components
│   │   ├── templates/ # Layout components
│   │   └── pages/     # Page components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities
│   ├── store/         # Redux store
│   ├── api/           # API integration
│   ├── styles/        # Global styles
│   └── assets/        # Static assets
├── public/            # Public assets
└── tests/             # Test files
```

## Setup

1. Install dependencies:

```bash
yarn install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Configure your `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Thuyen Silk
```

## Development

### Running the Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development
yarn dev           # Start development server
yarn build         # Build for production
yarn preview       # Preview production build

# Testing
yarn test          # Run tests
yarn test:watch    # Run tests in watch mode
yarn test:coverage # Run tests with coverage

# Linting
yarn lint          # Run ESLint
yarn lint:fix      # Fix ESLint errors

# Type checking
yarn type-check    # Run TypeScript type checking
```

## Component Architecture

### Atomic Design

The application follows atomic design principles:

1. **Atoms**: Basic building blocks (buttons, inputs, labels)
2. **Molecules**: Combinations of atoms (form groups, search bars)
3. **Organisms**: Complex components (product cards, data tables)
4. **Templates**: Layout components (page layouts, grid systems)
5. **Pages**: Complete pages (product list, inventory management)

### Component Example

```jsx
// atoms/Button.jsx
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
};

export default Button;
```

## State Management

### Redux Store Structure

```javascript
store/
├── slices/           # Redux slices
│   ├── auth.js       # Authentication state
│   ├── products.js   # Products state
│   └── inventory.js  # Inventory state
└── index.js          # Store configuration
```

### Example Slice

```javascript
// slices/products.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;
```

## API Integration

### React Query Setup

```javascript
// api/products.js
import { useQuery, useMutation } from '@tanstack/react-query';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(res => res.json()),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: data =>
      fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(res => res.json()),
  });
};
```

## Styling

### TailwindCSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8',
        secondary: '#5f6368',
      },
    },
  },
  plugins: [],
};
```

### Custom Styles

```scss
// styles/globals.scss
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium;
  }

  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-dark;
  }
}
```

## Testing

### Component Testing

```javascript
// tests/components/Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from '../../src/components/atoms/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Code Splitting

```javascript
// App.jsx
import { lazy, Suspense } from 'react';

const ProductList = lazy(() => import('./pages/ProductList'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductList />
    </Suspense>
  );
}
```

### Memoization

```javascript
import { useMemo, useCallback } from 'react';

const ProductCard = ({ product, onUpdate }) => {
  const formattedPrice = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(product.price);
  }, [product.price]);

  const handleUpdate = useCallback(() => {
    onUpdate(product.id);
  }, [product.id, onUpdate]);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formattedPrice}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is licensed under the MIT License.
