import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import partsPricingHero from "@/assets/parts-pricing-hero.jpg";
import orderTrendsHero from "@/assets/order-trends-hero.jpg";
import financialKpisHero from "@/assets/financial-kpis-hero.jpg";

const Projects = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Power BI Case Studies – B2B Portfolio</title>
        <meta name="description" content="Three completed Power BI case studies: Parts Pricing, Customer Order Trends, Financial KPIs. Includes datasets, SQL, DAX, and insights." />
        <link rel="canonical" href={`${window.location.origin}/projects`} />
      </Helmet>

      <section className="container mx-auto px-6 md:px-12 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Power BI Case Studies</h1>
        <p className="text-muted-foreground max-w-3xl mb-8">These projects simulate real B2B scenarios and demonstrate Dataflows, DAX measures, SQL transformations, and publishing to Power BI Service. Each case study includes datasets and reproducible steps.</p>

        <article className="rounded-lg border bg-card p-6 shadow-soft mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <img src={partsPricingHero} loading="lazy" alt="Power BI dashboard mock: B2B parts pricing and sales" className="w-full h-48 md:h-56 object-cover rounded" />
            <div>
              <h2 className="text-xl font-semibold">Project 1: Parts Pricing & Sales Dashboard</h2>
              <p className="text-sm text-muted-foreground mt-2">Analyze pricing trends, top-selling parts, revenue impact, and regional sales for a simulated manufacturing company.</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <h3 className="font-medium">Business Problem</h3>
                  <p>Identify price sensitivity and regional performance to inform discounting and margin optimization.</p>
                </div>
                <div>
                  <h3 className="font-medium">Tools</h3>
                  <p>Power BI (Dataflows, DAX), SQL, Power Query</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/projects/parts-pricing"><Button>Open Case Study</Button></Link>
                <a href="/portfolio/parts_pricing/dataset/parts_pricing_sales.csv"><Button variant="outline">CSV</Button></a>
                <a href="/portfolio/parts_pricing/sql/parts_pricing_transform.sql"><Button variant="outline">SQL</Button></a>
                <a href="/portfolio/parts_pricing/dax/parts_pricing_dax.txt"><Button variant="outline">DAX</Button></a>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-6 shadow-soft mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <img src={orderTrendsHero} loading="lazy" alt="Power BI dashboard mock: customer order trends and retention" className="w-full h-48 md:h-56 object-cover rounded" />
            <div>
              <h2 className="text-xl font-semibold">Project 2: Customer Order Trends Dashboard</h2>
              <p className="text-sm text-muted-foreground mt-2">Segment customers, track repeat orders, and visualize sales trends with retention and cadence KPIs.</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <h3 className="font-medium">Business Problem</h3>
                  <p>Detect churn risk and growth opportunities by analyzing repeat purchase behavior and segment value.</p>
                </div>
                <div>
                  <h3 className="font-medium">Tools</h3>
                  <p>Power BI (DAX), SQL, Power Query</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/projects/order-trends"><Button>Open Case Study</Button></Link>
                <a href="/portfolio/order_trends/dataset/customer_orders.csv"><Button variant="outline">CSV</Button></a>
                <a href="/portfolio/order_trends/sql/customer_orders_transform.sql"><Button variant="outline">SQL</Button></a>
                <a href="/portfolio/order_trends/dax/order_trends_dax.txt"><Button variant="outline">DAX</Button></a>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-lg border bg-card p-6 shadow-soft">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <img src={financialKpisHero} loading="lazy" alt="Power BI dashboard mock: financial KPI tracker" className="w-full h-48 md:h-56 object-cover rounded" />
            <div>
              <h2 className="text-xl font-semibold">Project 3: Financial KPI Tracker</h2>
              <p className="text-sm text-muted-foreground mt-2">Monitor revenue, gross margin %, and YoY growth by category with executive-ready visuals.</p>
              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <div>
                  <h3 className="font-medium">Business Problem</h3>
                  <p>Provide a fast, reliable P&L view to guide budgeting and growth initiatives.</p>
                </div>
                <div>
                  <h3 className="font-medium">Tools</h3>
                  <p>Power BI (DAX), SQL, Power Query</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/projects/financial-kpis"><Button>Open Case Study</Button></Link>
                <a href="/portfolio/financial_kpis/dataset/financial_kpis.csv"><Button variant="outline">CSV</Button></a>
                <a href="/portfolio/financial_kpis/sql/financial_kpis_transform.sql"><Button variant="outline">SQL</Button></a>
                <a href="/portfolio/financial_kpis/dax/financial_kpis_dax.txt"><Button variant="outline">DAX</Button></a>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Projects;
