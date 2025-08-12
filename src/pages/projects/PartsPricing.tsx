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

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

interface PricingRow {
  Date: string;
  PartID: string;
  PartName: string;
  Category: string;
  Region: string;
  Segment: string;
  UnitsSold: number;
  UnitPrice: number;
  Revenue: number;
}

const csvUrl = "/portfolio/parts_pricing/dataset/parts_pricing_sales.csv";

const PartsPricing = () => {
  const [rows, setRows] = useState<PricingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(csvUrl);
        const text = await res.text();
        const lines = text.trim().split(/\r?\n/);
        const headers = lines[0].split(",");
        const items: PricingRow[] = lines.slice(1).filter(Boolean).map((line) => {
          const cols = line.split(",");
          const obj: any = {};
          headers.forEach((h, i) => (obj[h] = cols[i]));
          obj.UnitsSold = Number(obj.UnitsSold);
          obj.UnitPrice = Number(obj.UnitPrice);
          obj.Revenue = Number(obj.Revenue);
          return obj as PricingRow;
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
    const units = rows.reduce((s, r) => s + r.UnitsSold, 0);
    const avgPrice = units ? totalRevenue / units : 0;

    // Monthly avg price for price change % (last vs prev month)
    const byMonth = new Map<string, { sumPrice: number; count: number }>();
    rows.forEach((r) => {
      const ym = new Date(r.Date).toISOString().slice(0, 7);
      const cur = byMonth.get(ym) ?? { sumPrice: 0, count: 0 };
      cur.sumPrice += r.UnitPrice;
      cur.count += 1;
      byMonth.set(ym, cur);
    });
    const months = Array.from(byMonth.entries())
      .map(([m, v]) => ({ m, avg: v.sumPrice / v.count }))
      .sort((a, b) => a.m.localeCompare(b.m));
    const last = months[months.length - 1]?.avg ?? null;
    const prev = months[months.length - 2]?.avg ?? null;
    const priceChangePct = last && prev ? ((last - prev) / prev) * 100 : null;

    return { totalRevenue, units, avgPrice, priceChangePct };
  }, [rows]);

  const priceTrendData = useMemo(() => {
    const byMonth = new Map<string, { sumPrice: number; count: number }>();
    rows.forEach((r) => {
      const ym = new Date(r.Date).toISOString().slice(0, 7);
      const cur = byMonth.get(ym) ?? { sumPrice: 0, count: 0 };
      cur.sumPrice += r.UnitPrice;
      cur.count += 1;
      byMonth.set(ym, cur);
    });
    return Array.from(byMonth.entries())
      .map(([month, v]) => ({ month, avgPrice: Number((v.sumPrice / v.count).toFixed(2)) }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [rows]);

  const topPartsData = useMemo(() => {
    const byPart = new Map<string, number>();
    rows.forEach((r) => byPart.set(r.PartName, (byPart.get(r.PartName) ?? 0) + r.Revenue));
    return Array.from(byPart.entries())
      .map(([name, revenue]) => ({ name, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [rows]);

  const regionRevenueData = useMemo(() => {
    const byRegion = new Map<string, number>();
    rows.forEach((r) => byRegion.set(r.Region, (byRegion.get(r.Region) ?? 0) + r.Revenue));
    return Array.from(byRegion.entries())
      .map(([region, revenue]) => ({ region, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [rows]);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Parts Pricing Dashboard – Power BI Portfolio</title>
        <meta name="description" content="B2B parts pricing dashboard with KPIs: Total Revenue, Average Price, Units Sold, and Price Change %. Interactive charts." />
        <link rel="canonical" href={`${window.location.origin}/projects/parts-pricing`} />
      </Helmet>

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
            <li>Visuals: Price trend line, Top parts by sales, Region revenue</li>
          </ul>
        </article>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-xl font-semibold">${(kpis.totalRevenue ?? 0).toLocaleString()}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Units Sold</p><p className="text-xl font-semibold">{(kpis.units ?? 0).toLocaleString()}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Average Price</p><p className="text-xl font-semibold">${(kpis.avgPrice ?? 0).toFixed(2)}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Price Change % (MoM)</p><p className="text-xl font-semibold">{kpis.priceChangePct === null ? "—" : `${kpis.priceChangePct.toFixed(2)}%`}</p></div>
        </div>

        {loading && <p className="mt-6 text-muted-foreground">Loading charts…</p>}
        {error && <p className="mt-6 text-destructive">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Average Price Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceTrendData} aria-label="Average price by month">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgPrice" name="Avg Price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Top Parts by Revenue</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topPartsData} aria-label="Top parts by revenue">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-4 shadow-soft lg:col-span-2">
              <h3 className="font-semibold mb-2">Revenue by Region</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionRevenueData} aria-label="Revenue by region">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
          </div>
        )}

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
