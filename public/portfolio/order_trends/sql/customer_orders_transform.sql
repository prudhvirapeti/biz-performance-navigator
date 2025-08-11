-- Customer Order Trends Transform (example)
WITH base AS (
  SELECT CAST(OrderDate AS date) AS OrderDate,
         CustomerID,
         CustomerName,
         Segment,
         Region,
         CAST(Revenue AS numeric(18,2)) AS Revenue
  FROM customer_orders_csv_source
), monthly AS (
  SELECT date_trunc('month', OrderDate) AS Month,
         CustomerID,
         COUNT(*) AS Orders,
         SUM(Revenue) AS Revenue
  FROM base
  GROUP BY 1,2
), prev_month AS (
  SELECT m.*, LAG(Orders) OVER (PARTITION BY CustomerID ORDER BY Month) AS PrevOrders
  FROM monthly m
)
SELECT
  Month,
  CustomerID,
  Orders,
  Revenue,
  CASE WHEN PrevOrders IS NULL THEN 0 ELSE 1 END AS IsRepeat
FROM prev_month;
