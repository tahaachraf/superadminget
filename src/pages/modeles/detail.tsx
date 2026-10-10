import { useParams, Link } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";

export default function ModeleDetail() {
  const { id } = useParams<{ id: string }>();
  const { modeles, modelesLoading, brands } = useData();
  const m = modeles.find((x) => x._id === id);

  if (!m) {
    return (
      <FicheState
        loading={modelesLoading}
        backHref="/modeles"
        backLabel="Retour aux modèles"
        notFound="Modèle non trouvé."
      />
    );
  }

  const marque = brands.find((b) => b._id === m.idMarque);

  return (
    <div className="space-y-6 max-w-3xl">
      <FicheHeader backHref="/modeles" title={m.nom} subtitle="Fiche modèle" />
      <FicheSection title="Informations">
        <FicheField label="Nom" value={m.nom} />
        <FicheField label="Slug" value={m.slug} />
        <FicheField
          label="Marque"
          value={
            marque ? (
              <Link href={`/marques/${marque._id}`} className="text-indigo-600 hover:underline">
                {marque.nom}
              </Link>
            ) : (
              ""
            )
          }
        />
        <FicheField label="Date de création" value={m.dateCreation} />
      </FicheSection>
    </div>
  );
}
