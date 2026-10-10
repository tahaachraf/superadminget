import { useParams } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";

export default function FournisseurDetail() {
  const { id } = useParams<{ id: string }>();
  const { suppliers, suppliersLoading } = useData();
  const f = suppliers.find((x) => x._id === id);

  if (!f) {
    return (
      <FicheState
        loading={suppliersLoading}
        backHref="/fournisseurs"
        backLabel="Retour aux fournisseurs"
        notFound="Fournisseur non trouvé."
      />
    );
  }

  const creePar =
    f.creePar && typeof f.creePar === "object"
      ? `${f.creePar.prenom ?? ""} ${f.creePar.nom ?? ""}`.trim() || f.creePar.email
      : f.creePar;

  return (
    <div className="space-y-6 max-w-3xl">
      <FicheHeader backHref="/fournisseurs" title={f.nom} subtitle="Fiche fournisseur" />
      <FicheSection title="Informations">
        <FicheField label="Nom" value={f.nom} />
        <FicheField label="Téléphone" value={f.tel} />
        <FicheField label="Email" value={f.email} />
        <FicheField
          label="Site web"
          value={
            f.siteWeb ? (
              <a href={f.siteWeb} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                {f.siteWeb}
              </a>
            ) : (
              ""
            )
          }
        />
        <FicheField
          label="Date de création"
          value={f.dateCreation ? new Date(f.dateCreation).toLocaleDateString("fr-FR") : ""}
        />
        <FicheField label="Créé par" value={creePar} />
      </FicheSection>
    </div>
  );
}
