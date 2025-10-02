import React from "react";
import StatCard from "../UI/StatCard";
import { StatCardData } from "./types";

interface StatsCardsProps {
  stats: StatCardData[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;
