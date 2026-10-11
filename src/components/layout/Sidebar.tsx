import { Link, useLocation } from "wouter";
import {
  Home,
  Box,
  Folder,
  Users,
  ShoppingCart,
  Truck,
  Tag,
  Layers,
  FileText,
  X,
} from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const [location] = useLocation();

  const links = [
    { href: "/dashboard", label: "Tableau de bord", icon: Home },
    { href: "/produits", label: "Produits", icon: Box },
    { href: "/categories", label: "Catégories", icon: Folder },
    { href: "/utilisateurs", label: "Utilisateurs", icon: Users },
    { href: "/commandes", label: "Commandes", icon: ShoppingCart },
    { href: "/fournisseurs", label: "Fournisseurs", icon: Truck },
    { href: "/marques", label: "Marques", icon: Tag },
    { href: "/modeles", label: "Modèles", icon: Layers },
    { href: "/devis", label: "Devis", icon: FileText },
  ];

  return (
    <>
      {/* Fond sombre derrière le menu (mobile / tablette uniquement) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu : tiroir coulissant en mobile, colonne fixe à partir de lg */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] bg-sidebar text-sidebar-foreground flex flex-col shrink-0 border-r border-sidebar-border transition-transform duration-200 ease-out lg:static lg:z-auto lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 font-bold text-xl tracking-tight bg-sidebar-accent/30 border-b border-sidebar-border shrink-0">
          adminSuper
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 -mr-3 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
            aria-label="Fermer le menu"
            data-testid="button-close-menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {links.map((link) => {
              const isActive = location.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                >
                  <Icon className="h-5 w-5 opacity-90" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
