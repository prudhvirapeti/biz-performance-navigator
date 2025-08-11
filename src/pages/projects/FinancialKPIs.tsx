import { Button } from "@/components/ui/button";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

const FinancialKPIs = () => {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-6 md:px-12 py-10">
        <SectionHeader title="Financial KPI Tracker" subtitle="P&L overview with gross margin %, YoY growth and profitability by category" />

        <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <h2>Business Problem</h2>
          <p>Executives need a concise view of financial performance to track margins, revenue growth, and category profitability, enabling faster decisions and goal tracking.</p>

          <h2>Dataset</h2>
          <ul>
            <li>CSV: <a href="/portfolio/financial_kpis/dataset/financial_kpis.csv">financial_kpis.csv</a></li>
            <li>SQL: <a href="/portfolio/financial_kpis/sql/financial_kpis_transform.sql">financial_kpis_transform.sql</a></li>
            <li>DAX: <a href="/portfolio/financial_kpis/dax/financial_kpis_dax.txt">financial_kpis_dax.txt</a></li>
          </ul>

          <h2>Key Insights</h2>
          <ul>
            <li>KPIs: Gross Margin %, YoY Revenue Growth, Category Profitability</li>
            <li>Visuals: Waterfall chart, Profit by Category clustered bars, KPI cards</li>
          </ul>

          <h2>Power BI Build Notes</h2>
          <ol>
            <li>Use a Date table for time intelligence and mark it as a date table.</li>
            <li>Implement YoY using SAMEPERIODLASTYEAR and ensure relationships are set correctly.</li>
          </ol>
        </article>

        <div className="mt-8 flex gap-3">
          <a href="/portfolio/financial_kpis/dataset/financial_kpis.csv"><Button>Download CSV</Button></a>
          <a href="/portfolio/financial_kpis/dax/financial_kpis_dax.txt"><Button variant="outline">DAX</Button></a>
          <a href="/portfolio/financial_kpis/sql/financial_kpis_transform.sql"><Button variant="outline">SQL</Button></a>
        </div>
      </section>
    </main>
  );
};

export default FinancialKPIs;
