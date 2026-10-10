import { useParams } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";
import { getCategoryPath } from "@/lib/utils";

const dt = (n?: number) => (n === undefined || n === null ? "" : `${n.toLocaleString("fr-TN")} DT`);

export default function ProduitDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, productsLoading, categories } = useData();
  const p = products.find((x) => x._id === id);

  if (!p) {
    return (
      <FicheState
        loading={productsLoading}
        backHref="/produits"
        backLabel="Retour aux produits"
        notFound="Produit non trouvé."
      />
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <FicheHeader backHref="/produits" title={p.nom} subtitle={`Fiche produit — ${p.reference}`} />

      <FicheSection title="Informations générales">
        <FicheField label="Référence" value={p.reference} />
        <FicheField label="Nom" value={p.nom} />
        <FicheField label="Titre du site" value={p.titreSite} />
        <FicheField label="Slug" value={p.slug} />
        <FicheField label="Catégorie" value={getCategoryPath(p.categorie, categories) || p.categorie} />
        <FicheField label="Statut" value={p.statutProduit} />
      </FicheSection>

      <FicheSection title="Prix et stock">
        <FicheField label="Coût" value={dt(p.cout)} />
        <FicheField label="Prix" value={dt(p.prix)} />
        <FicheField label="Quantité en stock" value={p.quantiteStock} />
        <FicheField label="Poids (kg)" value={p.poids} />
        <FicheField label="Délai de livraison (jours)" value={p.delaiLivraison} />
        <FicheField label="Promotion" value={p.promotion ? "Oui" : "Non"} />
        <FicheField label="Afficher la quantité disponible" value={p.afficherLaQuantiteDispo ? "Oui" : "Non"} />
      </FicheSection>

      <FicheSection title="Descriptions et SEO">
        <FicheField wide label="Description" value={p.description} />
        <FicheField wide label="Description supplémentaire" value={p.descriptionSupplementaire} />
        <FicheField wide label="Meta description" value={p.metaDescription} />
        <FicheField wide label="Mots-clés meta" value={p.motsClesMeta} />
      </FicheSection>
    </div>
  );
}
