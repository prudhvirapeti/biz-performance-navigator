import { Button } from "@/components/ui/button";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

const OrderTrends = () => {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 md:px-12 py-10">
        <SectionHeader title="Customer Order Trends Dashboard" subtitle="Retention, cadence, and order value by customer segment" />

        <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <h2>Business Problem</h2>
          <p>Understand how different customer segments contribute to orders and revenue over time, and identify opportunities to improve retention and repeat purchases.</p>

          <h2>Dataset</h2>
          <ul>
            <li>CSV: <a href="/portfolio/order_trends/dataset/customer_orders.csv">customer_orders.csv</a></li>
            <li>SQL: <a href="/portfolio/order_trends/sql/customer_orders_transform.sql">customer_orders_transform.sql</a></li>
            <li>DAX: <a href="/portfolio/order_trends/dax/order_trends_dax.txt">order_trends_dax.txt</a></li>
          </ul>

          <h2>Key Insights</h2>
          <ul>
            <li>KPIs: Customer Retention %, Avg. Orders per Customer, Monthly Order Trend</li>
            <li>Visuals: Segment share donut, Monthly trend line, Top customers table with drill-through</li>
          </ul>

          <h2>Power BI Build Notes</h2>
          <ol>
            <li>Use drill-through from the Top Customers table to a customer detail page filtered by CustomerID.</li>
            <li>Use bookmarks or page navigators for filter context clarity.</li>
          </ol>
        </article>

        <div className="mt-8 flex gap-3">
          <a href="/portfolio/order_trends/dataset/customer_orders.csv"><Button>Download CSV</Button></a>
          <a href="/portfolio/order_trends/dax/order_trends_dax.txt"><Button variant="outline">DAX</Button></a>
          <a href="/portfolio/order_trends/sql/customer_orders_transform.sql"><Button variant="outline">SQL</Button></a>
        </div>
      </section>
    </main>
  );
};

export default OrderTrends;
