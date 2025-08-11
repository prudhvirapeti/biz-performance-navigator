-- Financial KPI Transform (example)
WITH base AS (
  SELECT CAST(Month AS date) AS Month,
         Category,
         CAST(Revenue AS numeric(18,2)) AS Revenue,
         CAST(COGS AS numeric(18,2)) AS COGS
  FROM financial_kpis_csv_source
), metrics AS (
  SELECT *, (Revenue - COGS) AS Profit,
         CASE WHEN Revenue=0 THEN NULL ELSE ROUND((Revenue - COGS)/Revenue*100,2) END AS GrossMarginPct
  FROM base
), yoy AS (
  SELECT m.*,
         LAG(Revenue) OVER (PARTITION BY Category ORDER BY Month) AS PrevRevenue
  FROM metrics m
)
SELECT *,
       CASE WHEN PrevRevenue IS NULL OR PrevRevenue=0 THEN NULL
            ELSE ROUND((Revenue - PrevRevenue)/PrevRevenue*100,2) END AS YoYRevenuePct
FROM yoy;
