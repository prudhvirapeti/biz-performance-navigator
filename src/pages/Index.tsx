import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-bi-portfolio.jpg";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Power BI Portfolio – B2B Parts Pricing</title>
        <meta name="description" content="Data Scientist/BI Developer with 2–3 years in Power BI, SQL, DAX, Dataflows, and publishing to Power BI Service." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="Power BI portfolio hero banner with data visuals" className="w-full h-[46vh] md:h-[60vh] object-cover animate-float" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Data Scientist / BI Developer Portfolio</h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6">Three professional, customer-ready Power BI dashboards featuring Dataflows, DAX, SQL transformations, and B2B parts pricing analysis.</p>
              <div className="flex gap-3">
                <Link to="/projects"><Button variant="hero" size="lg">View Projects</Button></Link>
                <a href="/portfolio/README.txt" className="inline-block"><Button variant="subtle" size="lg">Download Assets</Button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">About Me</h2>
        <p className="text-muted-foreground max-w-3xl">I’m a Data Scientist / BI Developer with 2–3 years of hands-on experience building Power BI solutions for B2B pricing and sales. I work end-to-end across Power BI Dataflows, SQL modeling, DAX measures, and publishing to Power BI Service. In customer-facing roles, I’ve partnered with sales and product teams to translate business questions into measurable dashboards.</p>
        <ul className="list-disc pl-6 mt-3 text-sm text-muted-foreground space-y-1 max-w-3xl">
          <li>Delivered pricing dashboards that reduced quote cycle time and improved margin visibility</li>
          <li>Implemented reusable Dataflows and standardized DAX KPIs for consistent reporting</li>
          <li>Published and managed apps in Power BI Service with workspace governance</li>
        </ul>
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
