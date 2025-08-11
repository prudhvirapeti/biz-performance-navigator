# Optional Python cleaning for Parts Pricing
# Usage: python parts_pricing_cleaning.py

import pandas as pd
from pathlib import Path

SRC = Path("parts_pricing_sales.csv")
OUT = Path("parts_pricing_sales_prepared.csv")

if __name__ == "__main__":
    df = pd.read_csv(SRC, parse_dates=["Date"])  # local run next to the CSV or adjust path
    # Basic type cleanup
    df["UnitsSold"] = df["UnitsSold"].astype(int)
    df["UnitPrice"] = df["UnitPrice"].astype(float)
    df["Revenue"] = df["Revenue"].astype(float)

    # Rolling 3-month avg price by PartID/Region
    df = df.sort_values(["PartID", "Region", "Date"])  
    df["AvgPrice_3M"] = (
        df.groupby(["PartID", "Region"])  
          ["UnitPrice"]
          .transform(lambda s: s.rolling(window=3, min_periods=1).mean())
    )

    df.to_csv(OUT, index=False)
    print(f"Written {OUT.resolve()}")
