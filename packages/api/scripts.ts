// scripts/generate-routes-map.ts
import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const MODULES_PATH = './src/modules'
const OUTPUT_FILE = './src/http/routes.ts'

function findRouteFiles(dir: string): string[] {
  const results: string[] = []

  for (const item of readdirSync(dir)) {
    const fullPath = join(dir, item)
    if (statSync(fullPath).isDirectory()) {
      results.push(...findRouteFiles(fullPath))
    } else if (item.endsWith('Routes.ts')) {
      results.push(fullPath)
    }
  }
  return results
}

const routeFiles = findRouteFiles(MODULES_PATH)

const imports = routeFiles.map((file) => {
  // ./src/modules/auth/AuthRoutes.ts → ./modules/auth/AuthRoutes
  const importPath = file
    .replace('src/', '../')
    .replace('.ts', '.js')

  const moduleName = file.split('/').pop()!.replace('Routes.ts', '').toLowerCase()

  return { moduleName, importPath }
})
const content = `// AUTO-GENERATED — não editar manualmente
// gerado em: ${new Date().toISOString()}

const routeModules: Record<string, () => Promise<any>> = {
${imports.map(({ moduleName, importPath }) =>
  `  ${moduleName}: () => import('${importPath}'),`
).join('\n')}
}

export default routeModules
`
writeFileSync(OUTPUT_FILE, content)
console.log(`[+] routes.ts gerado com ${imports.length} rotas:`)
imports.forEach(({ moduleName, importPath }) => {
  console.log(`    ${moduleName} → ${importPath}`)
})