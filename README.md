# 🛍️ NovaStore - Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A modern, responsive e-commerce platform built with React and Vite, featuring a sleek design and seamless shopping experience.

## 🌟 Features

### 🎨 **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Interactive Carousel**: Smooth product showcases with navigation controls
- **Dynamic Banners**: Engaging video and image banners with call-to-action buttons
- **Newsletter Integration**: Subscription system with attractive design

### 🛒 **E-Commerce Functionality**
- **Product Catalog**: Browse products by categories (Men, Women, Accessories)
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Product Details**: Comprehensive product pages with ratings and reviews
- **Search Functionality**: Find products quickly with integrated search
- **Size Selection**: Interactive size selection for clothing items

### 🔧 **Technical Excellence**
- **Robust Image Handling**: Custom utility functions for API image URL fixes
- **Performance Optimized**: Lazy loading, code splitting, and optimized builds
- **Error Handling**: Graceful fallbacks for broken images and API failures
- **Mobile Optimized**: Enhanced mobile experience with touch-friendly interfaces

## 🚀 Live Demo

**[View Live Demo](https://novastoredn.netlify.app/)** 

## 📸 Screenshots

<details>
<summary>🖥️ Desktop Views</summary>

### Homepage
![Homepage Desktop](screenshots/homepage-desktop.png)

### Product Catalog
![Product Catalog](screenshots/catalog-desktop.png)

### Shopping Cart
![Shopping Cart](screenshots/cart-desktop.png)

</details>

<details>
<summary>📱 Mobile Views</summary>

### Mobile Homepage
![Mobile Homepage](screenshots/homepage-mobile.png)

### Mobile Product Grid
![Mobile Products](screenshots/products-mobile.png)

</details>

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 19** - Modern React with latest features
- **React Router DOM** - Client-side routing
- **React Context API** - State management for cart functionality

### **Build Tools & Development**
- **Vite 6** - Lightning-fast build tool and dev server
- **ESLint** - Code linting and quality assurance
- **CSS3** - Modern CSS with Flexbox and Grid

### **UI & Styling**
- **Bootstrap 5** - Responsive framework
- **Bootstrap Icons** - Icon library
- **FontAwesome** - Additional icon set
- **Custom CSS** - Tailored styling for unique design

### **External APIs**
- **FakeStore API** - Product data and inventory
- **Custom Image Utils** - Enhanced image handling and fallbacks

## ⚡ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/IgnacioDN/NovaStore.git
   cd NovaStore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
NovaStore/
├── 📁 public/
│   ├── 📄 _redirects          # Netlify routing configuration
│   └── 🖼️ assets/            # Static images and videos
├── 📁 src/
│   ├── 📁 components/         # Reusable React components
│   │   ├── 🧩 Header.jsx     # Navigation and branding
│   │   ├── 🛒 Cart.jsx       # Shopping cart functionality
│   │   ├── 🎠 ProductCarousel.jsx
│   │   ├── 📋 ProductList.jsx
│   │   └── ⭐ Rating.jsx     # Star rating component
│   ├── 📁 pages/             # Page components
│   │   ├── 👔 MenCategory.jsx
│   │   ├── 👗 WomenCategory.jsx
│   │   ├── 💎 AccessoriesCategory.jsx
│   │   ├── 🏪 Shop.jsx
│   │   ├── 🔑 LoginPage.jsx
│   │   └── 💳 Checkout.jsx
│   ├── 📁 context/           # React Context providers
│   │   └── 🛒 CartContext.jsx
│   ├── 📁 utils/             # Utility functions
│   │   └── 🖼️ imageUtils.js  # Image handling utilities
│   ├── 📁 styles/            # CSS stylesheets
│   │   ├── 🎨 App.css
│   │   ├── 🔑 Login.css
│   │   └── 📚 library.css
│   ├── 🚀 App.jsx            # Main application component
│   └── 🏗️ main.jsx           # Application entry point
├── 📄 package.json
├── ⚙️ vite.config.js
├── 🌐 netlify.toml          # Netlify deployment config
└── 📖 README.md
```

## 🔧 Key Features Implementation

### 🖼️ **Smart Image Handling**
```javascript
// Custom utility for handling FakeStore API image inconsistencies
export const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return '/placeholder-image.jpg';
  
  // Fix common FakeStore API image URL issues
  if (imageUrl.includes('fakestoreapi.com/img/') && imageUrl.endsWith('.jpg')) {
    return imageUrl.replace('.jpg', 't.png');
  }
  
  return imageUrl;
};
```

### 🛒 **Cart Management**
```javascript
// React Context for global cart state
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
```

### 📱 **Responsive Design**
```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

## 🌐 Deployment

### **Netlify Deployment**

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Environment Variables** (if needed):
   ```
   NODE_VERSION=18
   ```

The project includes a `netlify.toml` file with optimized deployment configuration.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📋 Development Guidelines

### **Code Style**
- Use ESLint configuration provided
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic

### **Component Structure**
- Use functional components with hooks
- Implement proper prop validation
- Keep components focused and reusable
- Use consistent naming conventions

## 🐛 Known Issues & Solutions

### **Image Loading Issues**
- **Problem**: Some FakeStore API images may not load
- **Solution**: Implemented custom `imageUtils.js` with fallback mechanisms

### **Mobile Navigation**
- **Problem**: Dropdown menus on mobile devices
- **Solution**: Touch-friendly navigation with proper event handling

## 📝 Changelog

### **v1.2.0** (Latest)
- ✅ Added comprehensive image error handling
- ✅ Improved responsive design for large screens
- ✅ Enhanced mobile login experience
- ✅ Added lazy loading for better performance

### **v1.1.0**
- ✅ Implemented shopping cart functionality
- ✅ Added product filtering and search
- ✅ Enhanced UI/UX with animations

### **v1.0.0**
- ✅ Initial release with core e-commerce features
- ✅ Product catalog and detail pages
- ✅ Responsive design implementation

## 📞 Support & Contact

- **Email**: ignaciodiazneila@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ignacio-agustin-diaz-neila-0359581b4/

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**


*Built by Ignacio Diaz Neila*

</div>
