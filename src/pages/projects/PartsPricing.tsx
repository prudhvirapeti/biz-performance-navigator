import { Button } from "@/components/ui/button";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

const PartsPricing = () => {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 md:px-12 py-10">
        <SectionHeader title="Parts Pricing & Sales Dashboard" subtitle="B2B parts pricing trends, volume, and regional performance" />

        <article className="max-w-none space-y-4 text-sm md:text-base">
          <h2 className="text-lg font-semibold">Business Problem</h2>
          <p>Manufacturers and distributors need to monitor price movements across parts, regions, and segments while balancing volume and margin. The dashboard supports pricing decisions, discount strategies, and forecasting.</p>

          <h2 className="text-lg font-semibold">Dataset</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>CSV: <a href="/portfolio/parts_pricing/dataset/parts_pricing_sales.csv" className="text-primary underline-offset-4 hover:underline">parts_pricing_sales.csv</a></li>
            <li>SQL: <a href="/portfolio/parts_pricing/sql/parts_pricing_transform.sql" className="text-primary underline-offset-4 hover:underline">parts_pricing_transform.sql</a></li>
            <li>DAX: <a href="/portfolio/parts_pricing/dax/parts_pricing_dax.txt" className="text-primary underline-offset-4 hover:underline">parts_pricing_dax.txt</a></li>
            <li>Python (optional): <a href="/portfolio/parts_pricing/python/parts_pricing_cleaning.py" className="text-primary underline-offset-4 hover:underline">parts_pricing_cleaning.py</a></li>
          </ul>

          <h2 className="text-lg font-semibold">Key Insights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>KPIs: Total Revenue, Average Price, Units Sold, Price Change %</li>
            <li>Visuals: Price trend line, Top parts by sales, Map by region, KPI cards, Slicers by date/product/region</li>
          </ul>

          <h2 className="text-lg font-semibold">Power BI Build Notes</h2>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Create a Dataflow for the CSV source and apply the SQL transform logic in Power Query where applicable.</li>
            <li>Add calculated columns and measures from the DAX file.</li>
            <li>Publish to Power BI Service and enable scheduled refresh.</li>
          </ol>
        </article>

        <div className="mt-8 flex gap-3">
          <a href="/portfolio/parts_pricing/dataset/parts_pricing_sales.csv"><Button>Download CSV</Button></a>
          <a href="/portfolio/parts_pricing/dax/parts_pricing_dax.txt"><Button variant="outline">DAX</Button></a>
          <a href="/portfolio/parts_pricing/sql/parts_pricing_transform.sql"><Button variant="outline">SQL</Button></a>
        </div>
      </section>
    </main>
  );
};

export default PartsPricing;
