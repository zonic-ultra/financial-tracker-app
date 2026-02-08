"use client";

import { useEffect, useState } from "react";
import { PiggyBank, TrendingUp } from "lucide-react"; // or Savings icon

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import api from "@/src/api/axios";

export default function Savings() {
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        // Adjust endpoint: could be /savings/total, /net-savings, or compute client-side
        const res = await api.get("/savings/total"); // or /cashflow/net

        console.log("Raw savings response:", res.data);

        const value = Number(
          typeof res.data === "number"
            ? res.data
            : (res.data?.total ??
                res.data?.savings ??
                res.data?.net ??
                res.data?.amount ??
                0),
        );

        setTotal(value);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load savings:", err);
        setError("Could not load savings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavings();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          {/* <div className="mt-1 size-6 rounded-full bg-purple-600/10 flex items-center justify-center flex-shrink-0">
            <PiggyBank className="h-6 w-6 text-muted-foreground" />
          </div> */}
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
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <div className="mt-1 size-9 rounded-full bg-purple-600/10 flex items-center justify-center flex-shrink-0">
            <PiggyBank className="h-6 w-6 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">Error</div>
          <p className="text-xs text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const formatted = total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Savings</CardTitle>
        <div className="mt-1 size-9 rounded-full bg-purple-600/10 flex items-center justify-center flex-shrink-0">
          <PiggyBank className="h-6 w-6 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${formatted}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {total > 0 ? (
            <>
              <TrendingUp className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-600 font-medium">Building</span>
            </>
          ) : (
            <span className="text-muted-foreground">Start saving today</span>
          )}
          <span className="text-muted-foreground ml-1">• This period</span>
        </div>
      </CardContent>
    </Card>
  );
}
