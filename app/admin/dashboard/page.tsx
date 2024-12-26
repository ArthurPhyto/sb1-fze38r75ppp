"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("7"); // 7 jours par défaut
  const [categoryStats, setCategoryStats] = useState<any[]>([]);
  const [movieStats, setMovieStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      // Simulons des statistiques pour l'exemple
      const { data: categories } = await supabase
        .from("categorie")
        .select("*");

      const mockCategoryStats = categories?.map((cat) => ({
        name: cat.name,
        views: Math.floor(Math.random() * 1000)
      })) || [];

      const { data: movies } = await supabase
        .from("movies")
        .select("*")
        .limit(10);

      const mockMovieStats = movies?.map((movie) => ({
        name: movie.title,
        views: Math.floor(Math.random() * 500)
      })) || [];

      setCategoryStats(mockCategoryStats);
      setMovieStats(mockMovieStats);
    };

    fetchStats();
  }, [dateRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">
          Période
        </label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
        >
          <option value="7">7 derniers jours</option>
          <option value="30">30 derniers jours</option>
          <option value="90">90 derniers jours</option>
        </select>
      </div>

      <div className="grid gap-8">
        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Catégories les plus consultées</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Films les plus consultés</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movieStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}