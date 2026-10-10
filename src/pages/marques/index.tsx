import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Link } from "wouter";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Loader2 } from "lucide-react";

export default function MarquesList() {
  const { brands, brandsLoading } = useData();
  const [search, setSearch] = useState("");

  const filtered = brands.filter(
    (b) =>
      b.nom.toLowerCase().includes(search.toLowerCase()) ||
      (b.slug ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marques</h1>
          <p className="text-muted-foreground mt-2">Gérez les marques de vos produits.</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une marque..."
          className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          data-testid="input-search"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Date création</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandsLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  <Loader2 size={20} className="animate-spin mx-auto text-gray-400" />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  Aucune marque trouvée.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((m) => (
                <TableRow
                  key={m._id}
                  className="hover:bg-slate-50 transition-colors"
                  data-testid={`row-brand-${m._id}`}
                >
                  <TableCell className="font-medium">
                    <Link href={`/marques/${m._id}`} className="text-indigo-600 hover:underline">
                      {m.nom}
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-500 font-mono text-xs">{m.slug}</TableCell>
                  <TableCell className="text-gray-500">{m.dateCreation}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
