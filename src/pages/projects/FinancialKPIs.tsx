import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import financialKpisHero from "@/assets/financial-kpis-hero.jpg";
 
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

interface Row {
  Month: string;
  Category: string;
  Revenue: number;
  COGS: number;
}

const csvUrl = "/portfolio/financial_kpis/dataset/financial_kpis.csv";

const FinancialKPIs = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(csvUrl);
        const text = await res.text();
        const lines = text.trim().split(/\r?\n/);
        const headers = lines[0].split(",");
        const items: Row[] = lines.slice(1).filter(Boolean).map((line) => {
          const cols = line.split(",");
          const obj: any = {};
          headers.forEach((h, i) => (obj[h] = cols[i]));
          obj.Revenue = Number(obj.Revenue);
          obj.COGS = Number(obj.COGS);
          return obj as Row;
        });
        setRows(items);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load CSV");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const kpis = useMemo(() => {
    const totalRevenue = rows.reduce((s, r) => s + r.Revenue, 0);
    const totalCOGS = rows.reduce((s, r) => s + r.COGS, 0);
    const profit = totalRevenue - totalCOGS;
    const grossMarginPct = totalRevenue ? (profit / totalRevenue) * 100 : null;

    // MoM revenue growth (latest vs prev month across all categories)
    const byMonth = new Map<string, number>();
    rows.forEach((r) => {
      const ym = new Date(r.Month).toISOString().slice(0, 7);
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + r.Revenue);
    });
    const months = Array.from(byMonth.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    const last = months[months.length - 1]?.[1];
    const prev = months[months.length - 2]?.[1];
    const revGrowthMoM = last && prev ? ((last - prev) / prev) * 100 : null;

    return { totalRevenue, profit, grossMarginPct, revGrowthMoM };
  }, [rows]);

  const monthlyRevenue = useMemo(() => {
    const byMonth = new Map<string, number>();
    rows.forEach((r) => {
      const ym = new Date(r.Month).toISOString().slice(0, 7);
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + r.Revenue);
    });
    return Array.from(byMonth.entries())
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [rows]);

  const profitByCategory = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((r) => map.set(r.Category, (map.get(r.Category) ?? 0) + (r.Revenue - r.COGS)));
    return Array.from(map.entries())
      .map(([category, profit]) => ({ category, profit }))
      .sort((a, b) => b.profit - a.profit);
  }, [rows]);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Financial KPI Tracker – Power BI Portfolio</title>
        <meta name="description" content="P&L KPIs with gross margin %, revenue growth, and category profitability. Interactive charts from realistic CSVs." />
        <link rel="canonical" href={`${window.location.origin}/projects/financial-kpis`} />
      </Helmet>

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
            <li>KPIs: Gross Margin %, Revenue Growth %, Category Profitability</li>
            <li>Visuals: Monthly revenue trend, Profit by Category bars, KPI cards</li>
          </ul>
        </article>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Revenue</p><p className="text-xl font-semibold">${kpis.totalRevenue.toLocaleString()}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Profit</p><p className="text-xl font-semibold">${kpis.profit.toLocaleString()}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Gross Margin %</p><p className="text-xl font-semibold">{kpis.grossMarginPct === null ? "—" : `${kpis.grossMarginPct.toFixed(2)}%`}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Revenue Growth % (MoM)</p><p className="text-xl font-semibold">{kpis.revGrowthMoM === null ? "—" : `${kpis.revGrowthMoM.toFixed(2)}%`}</p></div>
        </div>

        {loading && <p className="mt-6 text-muted-foreground">Loading charts…</p>}
        {error && <p className="mt-6 text-destructive">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Monthly Revenue</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyRevenue} aria-label="Monthly revenue trend">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Profit by Category</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={profitByCategory} aria-label="Profit by category">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" name="Profit" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>
        )}

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
