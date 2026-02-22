# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
1. `Tons Claros (50 - 200): Fundos e Estados Suaves`
  50: Usado para o fundo de componentes muito sutis ou alertas leves. No Joy UI, é o fundo padrão de componentes com variant="soft" em estado de repouso.
  100: Usado para o fundo da Variant soft (ex: um botão clarinho ou uma tag/badge).
  200: Usado como Hover para a variante soft.`Quando passas o rato num botão clarinho, ele escurece para o tom 200.

2. `Tons Médios (300 - 400): Bordas e Feedback`
  300: A cor padrão para a Variant outlined (bordas de inputs ou botões com contorno).
  400: Usada para estados de foco (focus outline) ou para bordas mais destacadas quando o utilizador interage com um campo.

3. `O "Coração" do Tema (500): A Cor de Ação`
  500: É a sua cor principal. Quando usas <Button variant="solid" color="primary">, esta é a cor  de fundo que vais ver. É o tom que define a identidade visual da sua marca.

4. `Tons de Interação (600 - 700): Feedback de Clique`
  600: Usado para o Hover da variante solid. Como é ligeiramente mais escuro que o 500, dá a sensação visual de que o botão foi "focado".
  700: Usado para o estado Active (quando o botão está a ser pressionado/clicado). Também é muito usado como cor de texto para a variante soft (texto escuro sobre fundo claro) para garantir legibilidade.
  
5. `Tons Escuros (800 - 900): Texto e Contraste`
  800: Usado para textos de subtítulos ou ícones que precisam de muito contraste sobre fundos claros.
  900: A cor de texto mais forte. Usada em títulos ou quando precisas de contraste máximo. No modo escuro (dark mode), esta escala inverte a sua lógica de aplicação.