Power BI Portfolio Assets

Includes datasets (CSV), SQL transformations, DAX measures, and an optional Python script.

Projects:
1) Parts Pricing & Sales
   - CSV: /portfolio/parts_pricing/dataset/parts_pricing_sales.csv
   - SQL: /portfolio/parts_pricing/sql/parts_pricing_transform.sql
   - DAX: /portfolio/parts_pricing/dax/parts_pricing_dax.txt
   - Python: /portfolio/parts_pricing/python/parts_pricing_cleaning.py

2) Customer Order Trends
   - CSV: /portfolio/order_trends/dataset/customer_orders.csv
   - SQL: /portfolio/order_trends/sql/customer_orders_transform.sql
   - DAX: /portfolio/order_trends/dax/order_trends_dax.txt

3) Financial KPI Tracker
   - CSV: /portfolio/financial_kpis/dataset/financial_kpis.csv
   - SQL: /portfolio/financial_kpis/sql/financial_kpis_transform.sql
   - DAX: /portfolio/financial_kpis/dax/financial_kpis_dax.txt

How to build PBIX:
- In Power BI Desktop: Get Data > Text/CSV > select dataset CSVs.
- Use Power Query for basic cleanup; optionally replicate SQL transformations.
- Add measures from the DAX files.
- Create visuals per project brief.
- Publish to Power BI Service and set up Dataflows/refresh where applicable.
