-- Parts Pricing Transform (example)
-- Create table (optional, for reference)
-- CREATE TABLE parts_pricing_sales (...);

WITH base AS (
  SELECT
    CAST(Date AS date) AS date,
    PartID,
    PartName,
    Category,
    Region,
    Segment,
    CAST(UnitsSold AS int) AS UnitsSold,
    CAST(UnitPrice AS numeric(18,2)) AS UnitPrice,
    CAST(Revenue AS numeric(18,2)) AS Revenue
  FROM parts_pricing_sales_csv_source
),
price_change AS (
  SELECT
    *,
    LAG(UnitPrice) OVER (PARTITION BY PartID, Region ORDER BY date) AS PrevPrice
  FROM base
)
SELECT
  date,
  PartID,
  PartName,
  Category,
  Region,
  Segment,
  UnitsSold,
  UnitPrice,
  Revenue,
  CASE WHEN PrevPrice IS NULL OR PrevPrice=0 THEN NULL
       ELSE ROUND(((UnitPrice - PrevPrice) / PrevPrice) * 100, 2) END AS PriceChangePct
FROM price_change;
