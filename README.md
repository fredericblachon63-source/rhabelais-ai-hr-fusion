# Rhabelais - Consultant RH & IA

Site vitrine pour Rhabelais, consultant RH spécialisé en IA, No-Code et transformation digitale.

## 🚀 Technologies

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **Backend**: Supabase (Lovable Cloud)

## 📁 Structure du projet

```
├── public/              # Assets statiques
│   ├── favicon.ico
│   ├── robots.txt
│   ├── 404.html         # Fallback SPA pour GitHub Pages
│   ├── _redirects       # Règles redirect pour Netlify/Cloudflare
│   └── lovable-uploads/ # Images uploadées
├── src/
│   ├── assets/          # Images et ressources
│   ├── components/      # Composants React
│   │   ├── home/        # Sections page d'accueil
│   │   ├── layout/      # Layout, Navbar, Footer
│   │   └── ui/          # Composants shadcn/ui
│   ├── hooks/           # Hooks personnalisés
│   ├── pages/           # Pages de l'application
│   ├── integrations/    # Intégrations (Supabase)
│   └── lib/             # Utilitaires
├── supabase/
│   ├── functions/       # Edge Functions
│   └── config.toml      # Configuration Supabase
└── ...
```

## 🛣️ Routes disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/a-propos` | À propos |
| `/expertises` | Expertises RH |
| `/ia-nocode` | IA & No-Code |
| `/automatisations` | Automatisations |
| `/contact` | Formulaire de contact |
| `/login` | Connexion admin |
| `/admin` | Administration (protégé) |

## 🔧 Installation locale

```bash
# Cloner le repository
git clone <URL_DU_REPO>
cd rhabelais

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 🏗️ Build

```bash
# Générer le build de production
npm run build

# Prévisualiser le build
npm run preview
```

Le build sera généré dans le dossier `dist/`.

## 🌐 Déploiement

### Option 1: Lovable (Recommandé)

1. Ouvrir le projet dans Lovable
2. Cliquer sur "Publish" en haut à droite
3. Le site sera déployé automatiquement

### Option 2: GitHub Pages

1. Activer GitHub Pages dans les paramètres du repo
2. Source: GitHub Actions ou branche `gh-pages`
3. Le fichier `public/404.html` gère automatiquement les redirections SPA

### Option 3: Netlify / Cloudflare Pages

1. Connecter le repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Le fichier `public/_redirects` gère automatiquement les routes SPA

### Option 4: Vercel

1. Importer le projet depuis GitHub
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

Ajouter un fichier `vercel.json` si nécessaire:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## ⚙️ Variables d'environnement

Pour le backend Supabase (optionnel en local):

```env
VITE_SUPABASE_URL=<URL_SUPABASE>
VITE_SUPABASE_PUBLISHABLE_KEY=<ANON_KEY>
```

## 📝 Licence

Tous droits réservés © Rhabelais
