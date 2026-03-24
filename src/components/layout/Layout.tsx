import { useEffect } from 'react';
import TopBar from './TopBar';
import MainHeader from './MainHeader';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  structuredData?: Record<string, any>;
}

const Layout = ({ children, title, description, structuredData }: LayoutProps) => {
  useEffect(() => {
    const baseTitle = "Engine Markets | Premium Used Auto Parts";
    if (title) {
      document.title = `${title} | Engine Markets`;
    } else {
      document.title = baseTitle;
    }

    // Update meta description dynamically if provided
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <TopBar />
      <MainHeader />
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
