const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container mx-auto px-6 md:px-12 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {year} Prudhvi Raj Rapeti. All rights reserved.</p>
        <p>
          Built with <span className="font-medium">React</span>, <span className="font-medium">Vite</span>, <span className="font-medium">Tailwind CSS</span>, and <span className="font-medium">Recharts</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
