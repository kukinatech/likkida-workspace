// AUTO-GENERATED — não editar manualmente
// gerado em: 2026-03-05T10:07:30.937Z

const routeModules: Record<string, () => Promise<any>> = {
  auth: () => import('../modules/auth/AuthRoutes.js'),
  user: () => import('../modules/users/UserRoutes.js'),
  empresa: () => import('../modules/empresas/EmpresaRoutes.js'),
}

export default routeModules
