import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">BI Portfolio</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/projects/parts-pricing" className="hover:text-primary transition-colors">Parts Pricing</Link>
          <Link to="/projects/order-trends" className="hover:text-primary transition-colors">Order Trends</Link>
          <Link to="/projects/financial-kpis" className="hover:text-primary transition-colors">Financial KPIs</Link>
        </nav>
        <a href="/portfolio/README.pdf"><Button size="sm" variant="subtle">Download</Button></a>
      </div>
    </header>
  );
};

export default Header;
