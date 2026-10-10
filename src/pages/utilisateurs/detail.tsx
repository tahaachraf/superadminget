import { useParams } from "wouter";
import { useData } from "@/contexts/DataContext";
import { FicheHeader, FicheSection, FicheField, FicheState } from "@/components/Fiche";
import { generateNumeroUtilisateur } from "@/lib/utils";

const roleLabel: Record<string, string> = {
  client: "Client",
  internaute: "Internaute",
  superAdmin: "Super Admin",
  adminMarketing: "Admin Marketing",
  adminAchat: "Admin Achat",
};

export default function UtilisateurDetail() {
  const { id } = useParams<{ id: string }>();
  const { users, usersLoading } = useData();
  const u = users.find((x) => x._id === id);

  if (!u) {
    return (
      <FicheState
        loading={usersLoading}
        backHref="/utilisateurs"
        backLabel="Retour aux utilisateurs"
        notFound="Utilisateur non trouvé."
      />
    );
  }

  const numero = generateNumeroUtilisateur(users, u._id!);

  return (
    <div className="space-y-6 max-w-3xl">
      <FicheHeader
        backHref="/utilisateurs"
        title={`${numero} — ${u.prenom ?? ""} ${u.nom ?? ""}`.trim()}
        subtitle="Fiche utilisateur"
      />
      <FicheSection title="Informations">
        <FicheField label="N° Utilisateur" value={numero} />
        <FicheField label="Rôle" value={roleLabel[u.role] ?? u.role} />
        <FicheField label="Nom" value={u.nom} />
        <FicheField label="Prénom" value={u.prenom} />
        <FicheField label="Email" value={u.email} />
        <FicheField label="Date de création" value={u.dateCreation} />
      </FicheSection>
    </div>
  );
}
