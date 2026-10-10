import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DataProvider } from "@/contexts/DataContext";
import { Layout } from "@/components/layout/Layout";

import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import ProduitsList from "@/pages/produits/index";
import ProduitDetail from "@/pages/produits/detail";
import CategoriesList from "@/pages/categories/index";
import CategoryDetail from "@/pages/categories/detail";

import UtilisateursList from "@/pages/utilisateurs/index";
import UtilisateurDetail from "@/pages/utilisateurs/detail";
import CommandesList from "@/pages/commandes/index";
import CommandeDetail from "@/pages/commandes/detail";
import FournisseursList from "@/pages/fournisseurs/index";
import FournisseurDetail from "@/pages/fournisseurs/detail";
import MarquesList from "@/pages/marques/index";
import MarqueDetail from "@/pages/marques/detail";
import ModelesList from "@/pages/modeles/index";
import ModeleDetail from "@/pages/modeles/detail";
import DevisList from "@/pages/devis/index";
import DevisDetail from "@/pages/devis/detail";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
{/* Pages en lecture seule (GET uniquement) */}
      <Route>
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/produits/:id" component={ProduitDetail} />
            <Route path="/produits" component={ProduitsList} />
            <Route path="/categories/:id" component={CategoryDetail} />
            <Route path="/categories" component={CategoriesList} />
            <Route path="/utilisateurs/:id" component={UtilisateurDetail} />
            <Route path="/utilisateurs" component={UtilisateursList} />
            
            <Route path="/commandes/:id" component={CommandeDetail} />
            <Route path="/commandes" component={CommandesList} />
            <Route path="/fournisseurs/:id" component={FournisseurDetail} />
            <Route path="/fournisseurs" component={FournisseursList} />
            <Route path="/marques/:id" component={MarqueDetail} />
            <Route path="/marques" component={MarquesList} />
            <Route path="/modeles/:id" component={ModeleDetail} />
            <Route path="/modeles" component={ModelesList} />
            <Route path="/devis/:id" component={DevisDetail} />
            <Route path="/devis" component={DevisList} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
          <DataProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </DataProvider>
        
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;