import React from "react";
import { Clock, CheckCircle, TrendingUp, CreditCard } from "lucide-react";
import StatCard from "../UI/StatCard";

const PayoutsStats: React.FC = () => {
  const stats = [
    {
      title: "Pending Payouts",
      value: "$45,230",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Clock,
      iconBgColor: "bg-yellow-500",
    },
    {
      title: "Total Paid Out",
      value: "$892,341",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: CheckCircle,
      iconBgColor: "bg-green-500",
    },
    {
      title: "Platform Commission",
      value: "$78,450",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconBgColor: "bg-blue-500",
    },
    {
      title: "Active Vendors",
      value: "2,847",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: CreditCard,
      iconBgColor: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default PayoutsStats;
