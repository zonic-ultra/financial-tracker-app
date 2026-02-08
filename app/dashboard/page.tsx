// app/dashboard/page.tsx

import IncomeVsExpenses from "./income-vs-expenses/page";
import Savings from "./savings/page";
import Categories from "./total-categories/page";
import Transactions from "./total-transactions/income-vs-expenses/page";

export default function DashboardOverview() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-in">
      <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
        <div className="gap-5 mb-4">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Money Overview
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            See how you are doing with your money this month.
          </p>
        </div>
        <div className="grid gap-5 md:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* These three take 1 column each on lg+ */}

          <div className="bg-primary-foreground p-5 rounded-xl border shadow-sm lg:col-span-1">
            <Transactions />
          </div>
          <div className="bg-primary-foreground p-5 rounded-xl border shadow-sm lg:col-span-1">
            <Categories />
          </div>
          <div className="bg-primary-foreground p-5 rounded-xl border shadow-sm lg:col-span-1">
            <Savings />
          </div>

          {/* Chart takes full width always */}
          <div className="bg-primary-foreground p-5 md:p-6 rounded-xl border shadow-sm lg:col-span-3">
            <IncomeVsExpenses />
          </div>
        </div>
      </div>
    </div>
  );
}
