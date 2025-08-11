import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-bi-portfolio.jpg";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Power BI portfolio hero banner with data visuals" className="w-full h-[46vh] md:h-[60vh] object-cover animate-float" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Data Scientist / BI Developer Portfolio</h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">Three professional, customer-ready Power BI dashboards featuring Dataflows, DAX, SQL transformations, and B2B parts pricing analysis.</p>
              <div className="flex gap-3">
                <Link to="#projects"><Button variant="hero" size="lg">View Projects</Button></Link>
                <a href="/portfolio/README.txt" className="inline-block"><Button variant="subtle" size="lg">Download Assets</Button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-lg border bg-card p-6 shadow-soft hover:shadow-elegant transition-all">
            <h2 className="text-xl font-semibold mb-2">Parts Pricing & Sales</h2>
            <p className="text-sm text-muted-foreground mb-4">B2B parts pricing trends, volume, and regional performance with advanced DAX measures.</p>
            <div className="flex gap-3">
              <Link to="/projects/parts-pricing"><Button size="sm">Open</Button></Link>
              <a href="/portfolio/parts_pricing/dataset/parts_pricing_sales.csv"><Button variant="outline" size="sm">CSV</Button></a>
            </div>
          </article>
          <article className="rounded-lg border bg-card p-6 shadow-soft hover:shadow-elegant transition-all">
            <h2 className="text-xl font-semibold mb-2">Customer Order Trends</h2>
            <p className="text-sm text-muted-foreground mb-4">Retention and order cadence with drill-through to top customers.</p>
            <div className="flex gap-3">
              <Link to="/projects/order-trends"><Button size="sm">Open</Button></Link>
              <a href="/portfolio/order_trends/dataset/customer_orders.csv"><Button variant="outline" size="sm">CSV</Button></a>
            </div>
          </article>
          <article className="rounded-lg border bg-card p-6 shadow-soft hover:shadow-elegant transition-all">
            <h2 className="text-xl font-semibold mb-2">Financial KPI Tracker</h2>
            <p className="text-sm text-muted-foreground mb-4">P&L with gross margin %, YoY growth, and category profitability.</p>
            <div className="flex gap-3">
              <Link to="/projects/financial-kpis"><Button size="sm">Open</Button></Link>
              <a href="/portfolio/financial_kpis/dataset/financial_kpis.csv"><Button variant="outline" size="sm">CSV</Button></a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Index;
