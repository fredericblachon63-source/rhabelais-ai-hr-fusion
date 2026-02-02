# Rhabelais - Conseil RH & IA

Site vitrine de Rhabelais, cabinet de conseil RH spécialisé en transformation digitale et intelligence artificielle.

## 🛠️ Stack Technique

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Backend**: Supabase (Lovable Cloud)

## 📁 Structure du projet

```
├── public/                 # Assets statiques
│   ├── _redirects          # Config SPA pour Netlify/Cloudflare
│   ├── 404.html            # Fallback SPA pour GitHub Pages
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── assets/             # Images et icônes
│   ├── components/         # Composants React
│   │   ├── home/           # Sections page d'accueil
│   │   ├── layout/         # Navbar, Footer, Layout
│   │   └── ui/             # Composants shadcn/ui
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Pages de l'application
│   └── integrations/       # Intégration Supabase
├── supabase/
│   └── functions/          # Edge Functions
└── vite.config.ts          # Configuration Vite
```

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/VOTRE_USERNAME/rhabelais.git
cd rhabelais

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

## 📦 Build

```bash
# Générer le build de production
npm run build

# Preview du build
npm run preview
```

Le build sera généré dans le dossier `dist/`.

## 🌐 Déploiement

### Cloudflare Pages (Recommandé)

1. Connectez votre repo GitHub à Cloudflare Pages
2. Configuration:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node version**: 18+
3. Le fichier `public/_redirects` gère automatiquement les routes SPA

### Netlify

1. Connectez votre repo GitHub à Netlify
2. Configuration identique à Cloudflare Pages
3. Le fichier `_redirects` est automatiquement pris en compte

### GitHub Pages

1. Ajoutez le workflow GitHub Actions (`.github/workflows/deploy.yml`)
2. Activez GitHub Pages dans les settings du repo
3. Le fichier `404.html` gère le fallback pour les routes SPA

## 🔗 Routes disponibles

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/a-propos` | À propos de Rhabelais |
| `/expertises` | Services et expertises |
| `/ia-nocode` | Solutions IA & No-Code |
| `/automatisations` | Services d'automatisation |
| `/contact` | Formulaire de contact |
| `/login` | Connexion admin |
| `/admin` | Dashboard admin (protégé) |

## ⚙️ Variables d'environnement

Pour le fonctionnement complet (formulaire de contact, etc.), configurez:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## 📝 Licence

© 2025 Rhabelais - Tous droits réservés
