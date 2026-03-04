// AUTO-GENERATED — não editar manualmente
// gerado em: 2026-03-04T17:10:14.559Z

const routeModules: Record<string, () => Promise<any>> = {
  user: () => import('../modules/user/UserRoutes.js'),
  auth: () => import('../modules/auth/AuthRoutes.js'),
  empresa: () => import('../modules/empresa/EmpresaRoutes.js'),
}

export default routeModules
