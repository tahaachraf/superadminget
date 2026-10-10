import { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft, Loader2 } from "lucide-react";

export function FicheHeader({
  backHref,
  title,
  subtitle,
}: {
  backHref: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={backHref}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        data-testid="button-back"
      >
        <ArrowLeft size={18} />
      </Link>
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

export function FicheSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">{children}</div>
    </div>
  );
}

export function FicheField({
  label,
  value,
  wide,
}: {
  label: string;
  value?: ReactNode;
  wide?: boolean;
}) {
  const empty = value === undefined || value === null || value === "";
  return (
    <div className={wide ? "md:col-span-2" : undefined}>
      <p className="text-gray-500 mb-1">{label}</p>
      <div className="font-medium text-gray-900 whitespace-pre-wrap break-words">
        {empty ? <span className="text-gray-300">—</span> : value}
      </div>
    </div>
  );
}

export function FicheState({
  loading,
  backHref,
  backLabel,
  notFound,
}: {
  loading: boolean;
  backHref: string;
  backLabel: string;
  notFound: string;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400">
        <Loader2 size={24} className="animate-spin mr-2" />
        Chargement…
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <Link href={backHref} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft size={16} /> {backLabel}
      </Link>
      <p className="text-red-500">{notFound}</p>
    </div>
  );
}
