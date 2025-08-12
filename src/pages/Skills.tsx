import { Helmet } from "react-helmet-async";

const Skills = () => {
  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Skills – Power BI, SQL, DAX, Power Query</title>
        <meta name="description" content="Power BI (Dataflows, DAX, Service), SQL, Power Query, Python (optional), and data visualization best practices." />
        <link rel="canonical" href={`${window.location.origin}/skills`} />
      </Helmet>

      <section className="container mx-auto px-6 md:px-12 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Skills & Tools</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-2">Power BI</h2>
            <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
              <li>Dataflows for reusable ETL and centralized logic</li>
              <li>DAX measures for KPIs, time intelligence, and calculations</li>
              <li>Power BI Service: workspaces, app publishing, sharing, row-level security</li>
            </ul>
          </article>

          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-2">SQL</h2>
            <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
              <li>CTEs, window functions, and performance-aware queries</li>
              <li>Data modeling for analytics: star schema, surrogate keys</li>
              <li>Versioned SQL transforms aligned with BI semantics</li>
            </ul>
          </article>

          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-2">Power Query</h2>
            <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
              <li>Data cleaning, type handling, and incremental refresh patterns</li>
              <li>M language for custom transformations</li>
            </ul>
          </article>

          <article className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-2">Python (optional)</h2>
            <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
              <li>Pandas for data prep and feature engineering</li>
              <li>Jupyter for exploratory analysis and quick validations</li>
            </ul>
          </article>

          <article className="rounded-lg border bg-card p-6 md:col-span-2">
            <h2 className="font-semibold mb-2">Data Visualization Best Practices</h2>
            <ul className="list-disc pl-6 text-sm space-y-1 text-muted-foreground">
              <li>Single-KPI clarity with consistent number formatting</li>
              <li>Color used sparingly with semantic emphasis</li>
              <li>Annotations and titles for context; tooltips for depth</li>
              <li>Responsive dashboards optimized for Power BI Service</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Skills;
