import { Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center gap-3 px-4 sm:px-6 shrink-0">
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Ouvrir le menu"
        data-testid="button-open-menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <div className="font-medium text-base sm:text-lg text-muted-foreground truncate">
        Consultation (lecture seule)
      </div>
    </header>
  );
}
