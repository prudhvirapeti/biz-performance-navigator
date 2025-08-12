import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight">Prudhvi Raj Rapeti</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link to="/skills" className="hover:text-primary transition-colors">Skills</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <a href="portfolio/README.txt"><Button size="sm" variant="subtle">Download</Button></a>
      </div>
    </header>
  );
};

export default Header;
