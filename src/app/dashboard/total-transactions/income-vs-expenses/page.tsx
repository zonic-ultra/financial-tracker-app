"use client";

import { useEffect, useState } from "react";
import { ListChecks, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import api from "@/src/api/axios";

export default function Transactions() {
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTotal = async () => {
      try {
        const response = await api.get("/transactions/total");

        const value = Number(
          typeof response.data === "number"
            ? response.data
            : (response.data?.total ??
                response.data?.count ??
                response.data?.transactions ??
                response.data?.value ??
                response.data?.data ??
                0),
        );

        setTotal(value);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load total transactions:", err);
        setError("Could not load transactions");
      } finally {
        setIsLoading(false);
      }
    };

    loadTotal();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          {/* <div className="mt-1 size-6 rounded-full bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
            <ListChecks className="h-6 w-6 text-muted-foreground" />
          </div> */}
          {/* <ListChecks className="h-4 w-4 text-muted-foreground" /> */}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold animate-pulse">...</div>
          <p className="text-xs text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Transactions
          </CardTitle>
          <div className="mt-1 size-9 rounded-full bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
            <ListChecks className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total Transactions
        </CardTitle>
        <div className="mt-1 size-9 rounded-full bg-emerald-600/10 flex items-center justify-center flex-shrink-0">
          <ListChecks className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total.toLocaleString()}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {total > 0 ? (
            <>
              <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 font-medium">Active</span>
            </>
          ) : (
            <span className="text-muted-foreground">No transactions yet</span>
          )}
          <span className="text-muted-foreground ml-1">• All time</span>
        </div>
      </CardContent>
    </Card>
  );
}
