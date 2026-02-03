# Portfolio Website

A personal portfolio website featuring a cyber-futuristic design. Built with modern web technologies to showcase projects and skills.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-black?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?style=for-the-badge&logo=framer-motion&logoColor=white)

## Features

- ⚡ **Next.js 16** - Latest version with modern React features
- 📘 **Bilingual Support** - Fully bilingual (English & Indonesian) with context-aware translations
- 🎨 **Cyber-Futuristic UI** - Dark theme with orange accents and animated effects
- 📱 **Fully Responsive** - Mobile-first design with Tailwind CSS
- 🎭 **Animations** - Smooth transitions with Framer Motion
- 📄 **Static Generation** - Optimized performance with pre-rendered pages
- 🔒 **Type-Safe** - Full TypeScript support with strict mode
- 🔌 **PWA Ready** - Progressive Web App with offline capabilities

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript 5.1+](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: [Next.js Google Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, yarn, pnpm, atau bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aldicahyar/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# atau
yarn install
# atau
pnpm install
# atau
bun install
```

3. Run development server:
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
# atau
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Build & Deploy

### Build for Production

```bash
npm run build
# atau
yarn build
# atau
pnpm build
# atau
bun build
```

The `.next` directory will contain the optimized production build.

### Deploy to Vercel

The easiest way to deploy this Next.js app is using Vercel:

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Click "Deploy"

2. **Via CLI:**
```bash
npm install -g vercel
vercel
```

## Project Structure

```
portofolio/
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── contact.ts      # Server actions
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── not-found.tsx       # 404 page
│   │   ├── robots.ts           # SEO robots.txt
│   │   └── sitemap.ts          # SEO sitemap.xml
│   ├── components/
│   │   ├── sections/           # Page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── about-section.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── contact-section.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── encrypted-text.tsx
│   │       ├── page-transition.tsx
│   │       ├── preloader.tsx
│   │       ├── scroll-progress.tsx
│   │       ├── project-modal.tsx
│   │       └── ...
│   ├── context/                # React contexts
│   │   ├── language-context.tsx
│   │   └── glitch-context.tsx
│   ├── data/                   # Static data
│   │   ├── dictionary.ts
│   │   ├── experience.ts
│   │   └── projects.ts
│   └── lib/
│       └── utils.ts           # Utility functions
├── public/                     # Static assets
├── scripts/                    # Build scripts
├── next.config.ts             # Next.js configuration
└── package.json
```

## Key Components

### EncryptedText Component
Animated text effect that simulates data decryption. Supports bilingual content and deterministic animation for hydration safety.

```tsx
<EncryptedText
  text={{ en: "Backend Developer", id: "Backend Developer" }}
  encryptedClassName="text-neutral-500"
  revealedClassName="dark:text-white text-black"
  revealDelayMs={30}
  flipDelayMs={25}
  charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
/>
```

### Bilingual System
Uses context providers and translation dictionary for language switching:

```tsx
const { t, language, setLanguage } = useLanguage();
// Usage: t("hero.role")
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Change Colors
Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --cyber-dark: #0a0a0a;
  --cyber-light: #f4f4f5;
  --cyber-orange: #ff6b00;
  --cyber-muted: #a1a1aa;
}
```

### Add Projects
Edit `src/data/projects.ts`:

```tsx
export const projects: Project[] = [
  {
    title: "Project Name",
    description: {
      en: "Description in English",
      id: "Deskripsi dalam Bahasa Indonesia"
    },
    tags: ["Tech1", "Tech2", "Tech3"],
    category: "Category",
    status: "Live",
    // ...
  }
];
```

### Change Languages
Add translations to `src/data/dictionary.ts`:

```tsx
export const dictionary = {
  en: {
    // English translations
  },
  id: {
    // Indonesian translations
  }
};
```

## License

MIT

## Author

**Aldi Cahya Ramadhan**
- Website: [aldicahyar.vercel.app](https://aldicahyar.vercel.app/)
- GitHub: [@aldicahyar](https://github.com/aldicahyar)

## Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
