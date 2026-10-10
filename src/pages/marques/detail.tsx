import { useParams, Link } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";

export default function MarqueDetail() {
  const { id } = useParams<{ id: string }>();
  const { brands, brandsLoading, modeles } = useData();
  const m = brands.find((x) => x._id === id);

  if (!m) {
    return (
      <FicheState
        loading={brandsLoading}
        backHref="/marques"
        backLabel="Retour aux marques"
        notFound="Marque non trouvée."
      />
    );
  }

  const ses = modeles.filter((x) => x.idMarque === m._id);

  return (
    <div className="space-y-6 max-w-3xl">
      <FicheHeader backHref="/marques" title={m.nom} subtitle="Fiche marque" />
      <FicheSection title="Informations">
        <FicheField label="Nom" value={m.nom} />
        <FicheField label="Slug" value={m.slug} />
        <FicheField label="Date de création" value={m.dateCreation} />
        <FicheField
          label={`Modèles (${ses.length})`}
          value={
            ses.length > 0 ? (
              <ul className="space-y-1">
                {ses.map((x) => (
                  <li key={x._id}>
                    <Link href={`/modeles/${x._id}`} className="text-indigo-600 hover:underline">
                      {x.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )
          }
        />
      </FicheSection>
    </div>
  );
}
