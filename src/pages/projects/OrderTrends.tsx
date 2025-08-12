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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import orderTrendsHero from "@/assets/order-trends-hero.jpg";

const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </div>
);

interface OrderRow {
  OrderID: string;
  CustomerID: string;
  CustomerName: string;
  Segment: string;
  Region: string;
  OrderDate: string;
  Revenue: number;
}

const csvUrl = "portfolio/order_trends/dataset/customer_orders.csv";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--muted))",
];

const OrderTrends = () => {
  const [rows, setRows] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(csvUrl);
        const text = await res.text();
        const lines = text.trim().split(/\r?\n/);
        const headers = lines[0].split(",");
        const items: OrderRow[] = lines.slice(1).filter(Boolean).map((line) => {
          const cols = line.split(",");
          const obj: any = {};
          headers.forEach((h, i) => (obj[h] = cols[i]));
          obj.Revenue = Number(obj.Revenue);
          return obj as OrderRow;
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

  const metrics = useMemo(() => {
    const totalOrders = rows.length;
    const customers = new Set(rows.map((r) => r.CustomerID)).size;
    const avgOrdersPerCustomer = customers ? totalOrders / customers : 0;

    // Monthly orders and retention (latest vs prev month)
    const byMonthCustomers = new Map<string, Set<string>>();
    const byMonthOrders = new Map<string, number>();
    rows.forEach((r) => {
      const ym = new Date(r.OrderDate).toISOString().slice(0, 7);
      byMonthOrders.set(ym, (byMonthOrders.get(ym) ?? 0) + 1);
      const set = byMonthCustomers.get(ym) ?? new Set<string>();
      set.add(r.CustomerID);
      byMonthCustomers.set(ym, set);
    });
    const months = Array.from(byMonthOrders.keys()).sort();
    const latest = months[months.length - 1];
    const prev = months[months.length - 2];
    let retentionPct: number | null = null;
    if (latest && prev) {
      const latestCust = byMonthCustomers.get(latest) ?? new Set<string>();
      const prevCust = byMonthCustomers.get(prev) ?? new Set<string>();
      const retained = Array.from(latestCust).filter((c) => prevCust.has(c)).length;
      retentionPct = prevCust.size ? (retained / prevCust.size) * 100 : null;
    }

    return { avgOrdersPerCustomer, retentionPct, latestOrders: latest ? (byMonthOrders.get(latest) ?? 0) : 0 };
  }, [rows]);

  const monthlyTrend = useMemo(() => {
    const byMonth = new Map<string, number>();
    rows.forEach((r) => {
      const ym = new Date(r.OrderDate).toISOString().slice(0, 7);
      byMonth.set(ym, (byMonth.get(ym) ?? 0) + 1);
    });
    return Array.from(byMonth.entries())
      .map(([month, orders]) => ({ month, orders }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [rows]);

  const segmentShare = useMemo(() => {
    const bySegment = new Map<string, number>();
    rows.forEach((r) => bySegment.set(r.Segment, (bySegment.get(r.Segment) ?? 0) + r.Revenue));
    return Array.from(bySegment.entries()).map(([name, value]) => ({ name, value }));
  }, [rows]);

  const topCustomers = useMemo(() => {
    const byCustomer = new Map<string, { name: string; revenue: number; orders: number }>();
    rows.forEach((r) => {
      const cur = byCustomer.get(r.CustomerID) ?? { name: r.CustomerName, revenue: 0, orders: 0 };
      cur.revenue += r.Revenue;
      cur.orders += 1;
      byCustomer.set(r.CustomerID, cur);
    });
    return Array.from(byCustomer.entries())
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [rows]);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Customer Order Trends – Power BI Portfolio</title>
        <meta name="description" content="Order trends dashboard showing retention %, average orders per customer, monthly trend, segment share, and top customers." />
        <link rel="canonical" href={`${window.location.origin}/projects/order-trends`} />
      </Helmet>

      <section className="container mx-auto px-6 md:px-12 py-10">
        <img src={orderTrendsHero} alt="Power BI dashboard mock: customer order trends and retention" className="w-full h-56 md:h-80 object-contain md:object-cover rounded-lg mb-6" loading="eager" decoding="async" />
        <SectionHeader title="Customer Order Trends Dashboard" subtitle="Retention, cadence, and order value by customer segment" />
 
        <article className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
          <h2>Business Problem</h2>
          <p>Understand how different customer segments contribute to orders and revenue over time, and identify opportunities to improve retention and repeat purchases.</p>

          <h2>Dataset</h2>
          <ul>
            <li>CSV: <a href="portfolio/order_trends/dataset/customer_orders.csv">customer_orders.csv</a></li>
            <li>SQL: <a href="portfolio/order_trends/sql/customer_orders_transform.sql">customer_orders_transform.sql</a></li>
            <li>DAX: <a href="portfolio/order_trends/dax/order_trends_dax.txt">order_trends_dax.txt</a></li>
          </ul>

          <h2>Key Insights</h2>
          <ul>
            <li>KPIs: Customer Retention %, Avg. Orders per Customer, Monthly Order Trend</li>
            <li>Visuals: Segment share donut, Monthly trend line, Top customers table with drill-through</li>
          </ul>
        </article>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Retention % (MoM)</p><p className="text-xl font-semibold">{metrics.retentionPct === null ? "—" : `${metrics.retentionPct.toFixed(1)}%`}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Avg Orders / Customer</p><p className="text-xl font-semibold">{metrics.avgOrdersPerCustomer.toFixed(2)}</p></div>
          <div className="rounded-lg border bg-card p-4"><p className="text-xs text-muted-foreground">Orders (Latest Month)</p><p className="text-xl font-semibold">{metrics.latestOrders}</p></div>
        </div>

        {loading && <p className="mt-6 text-muted-foreground">Loading charts…</p>}
        {error && <p className="mt-6 text-destructive">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Monthly Orders</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend} aria-label="Monthly orders trend">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="orders" name="Orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-4 shadow-soft">
              <h3 className="font-semibold mb-2">Segment Share (Revenue)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={segmentShare} dataKey="value" nameKey="name" outerRadius={100} label>
                      {segmentShare.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="rounded-lg border bg-card p-4 shadow-soft lg:col-span-2">
              <h3 className="font-semibold mb-3">Top Customers</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2">Customer</th>
                      <th className="py-2">Orders</th>
                      <th className="py-2">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCustomers.map((c) => (
                      <tr key={c.id} className="border-t">
                        <td className="py-2">{c.name}</td>
                        <td className="py-2">{c.orders}</td>
                        <td className="py-2">${c.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <a href="portfolio/order_trends/dataset/customer_orders.csv"><Button>Download CSV</Button></a>
          <a href="portfolio/order_trends/dax/order_trends_dax.txt"><Button variant="outline">DAX</Button></a>
          <a href="portfolio/order_trends/sql/customer_orders_transform.sql"><Button variant="outline">SQL</Button></a>
          <a href="portfolio/order_trends/pbix/order_trends_build_kit.txt"><Button variant="outline">PBIX Build Kit</Button></a>
        </div>
      </section>
    </main>
  );
};

export default OrderTrends;
