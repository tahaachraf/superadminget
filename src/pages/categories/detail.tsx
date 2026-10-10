import { useParams, Link } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";
import { getCategoryPath } from "@/lib/utils";

export default function CategoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { categories, categoriesLoading } = useData();
  const c = categories.find((x) => x._id === id);

  if (!c) {
    return (
      <FicheState
        loading={categoriesLoading}
        backHref="/categories"
        backLabel="Retour aux catégories"
        notFound="Catégorie non trouvée."
      />
    );
  }

  const parent = c.categorieParent ? categories.find((x) => x._id === c.categorieParent) : undefined;
  const children = categories.filter((x) => x.categorieParent === c._id);

  return (
    <div className="space-y-6 max-w-4xl">
      <FicheHeader backHref="/categories" title={c.nom} subtitle="Fiche catégorie" />

      <FicheSection title="Informations">
        <FicheField label="Nom" value={c.nom} />
        <FicheField label="Slug" value={c.slug} />
        <FicheField
          label="Catégorie parente"
          value={
            parent ? (
              <Link href={`/categories/${parent._id}`} className="text-indigo-600 hover:underline">
                {getCategoryPath(parent._id, categories)}
              </Link>
            ) : (
              "Aucune (catégorie racine)"
            )
          }
        />
        <FicheField
          label="Sous-catégories"
          value={
            children.length > 0 ? (
              <ul className="space-y-1">
                {children.map((ch) => (
                  <li key={ch._id}>
                    <Link href={`/categories/${ch._id}`} className="text-indigo-600 hover:underline">
                      {ch.nom}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              ""
            )
          }
        />
        <FicheField wide label="Description" value={c.description} />
        <FicheField wide label="Meta description" value={c.metaDescription} />
        <FicheField wide label="Mots-clés meta" value={c.metaKeywords} />
      </FicheSection>
    </div>
  );
}
