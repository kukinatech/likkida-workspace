// AUTO-GENERATED — não editar manualmente
// gerado em: 2026-03-04T22:42:15.679Z

const routeModules: Record<string, () => Promise<any>> = {
  auth: () => import('../modules/auth/AuthRoutes.js'),
  user: () => import('../modules/users/UserRoutes.js'),
  empresa: () => import('../modules/empresas/EmpresaRoutes.js'),
}

export default routeModules
