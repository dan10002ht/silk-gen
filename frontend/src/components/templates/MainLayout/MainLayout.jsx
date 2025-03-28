import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';

const MainLayout = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center h-14">
          <div className="flex mr-4">
            <a className="flex items-center mr-6 space-x-2" href="/">
              <span className="font-bold text-primary">Thuyen Silk</span>
            </a>
          </div>
          <div className="flex flex-1 justify-between items-center space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <Button variant="ghost">Products</Button>
              <Button variant="ghost">Categories</Button>
              <Button variant="ghost">About</Button>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="soft">Sign In</Button>
              <Button variant="default">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-accent/30">
        <div className="container py-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold text-primary">About Us</h3>
              <p className="text-sm text-muted-foreground">
                Thuyen Silk provides high-quality silk products with modern designs.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-primary">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-primary">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Email: info@thuyensilk.com</li>
                <li className="text-muted-foreground">Phone: (123) 456-7890</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-primary">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Instagram
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default MainLayout;
