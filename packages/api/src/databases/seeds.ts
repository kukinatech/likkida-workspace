import { CreateEmpresaUseCase } from "@likkida/shared";
import supabase from "./supabase";
import { AuthProviderSupabase } from "../modules/auth/providers/AuthProviderSupabase";
import { EmpresaRepository } from "../modules/empresa/repositories/EmpresaRepository";
import { FuncionarioRepositorySupabase } from "../repositories/FuncionarioRepositorySupabase";
import { EmpresaRepositorySupabase } from "../modules/empresa/repositories/EmpresaRepositorySupabase";
import { UserRepositorySupabase } from "../modules/user/repositories/UserRepositorySupabase";
seedDatabase()

export async function seedDatabase() {
  try {

    const RegisterEmpresa = new CreateEmpresaUseCase(
      new EmpresaRepositorySupabase(),
      new FuncionarioRepositorySupabase(),
      new UserRepositorySupabase()
    )
    const { id: empresaId, user, funcionario } = await RegisterEmpresa.execute({
      nome: 'Empresa Demo',
      nif: '5000000001',
      email: 'admin@demo.com',
      contactos: ['923000000', '924000000'],
      endereco: 'Luanda, Angola',
      logoUrl: null
    })

    const { data: moeda, error: moedaError } = await supabase
      .from('moedas')
      .insert({
        descricao: 'Kwanza Angolano',
        simbol: 'AOA',
        empresa_id: empresaId
      })
      .select()
      .single()

    if (moedaError) throw moedaError

    // 5. ROLE
    const { data: role } = await supabase
      .from('roles')
      .insert({
        nome: 'Administrador',
        descricao: 'Acesso total',
        empresa_id: empresaId
      })
      .select()
      .single()

    // 6. PERMISSAO
    const { data: permissao } = await supabase
      .from('permissoes')
      .insert({
        nome: 'FULL_ACCESS',
        descricao: 'Acesso completo ao sistema',
        empresa_id: empresaId
      })
      .select()
      .single()

    // 7. ROLE_PERMISSAO
    await supabase.from('role_permissoes').insert({
      roles_id: role!.id,
      permissao_id: permissao!.id
    })

    // 8. USER_ROLE
    await supabase.from('user_roles').insert({
      role_id: role!.id,
      user_id: user.id
    })

    // 9. USER_PERMISSAO
    await supabase.from('user_permissoes').insert({
      permissao_id: permissao!.id,
      user_id: user.id
    })

    // 10. TIPO ARTIGO
    const { data: tipoArtigo } = await supabase
      .from('artigos_tipo')
      .insert({
        descricao: 'Produto',
        empresa_id: empresaId
      })
      .select()
      .single()

    // 11. ARTIGO
    const { data: artigo } = await supabase
      .from('artigos')
      .insert({
        nome: 'Computador',
        preco: 250000,
        artigo_tipo_id: tipoArtigo!.id,
        descricao: 'Computador portátil',
        empresa_id: empresaId
      })
      .select()
      .single()

    // 12. CLIENTE
    const { data: cliente } = await supabase
      .from('clientes')
      .insert({
        nome: 'Cliente Demo',
        nif: '5000000002',
        email: 'cliente@demo.com',
        endereco: 'Luanda',
        contactos: ['925000000'],
        empresa_id: empresaId
      })
      .select()
      .single()

    // 13. DOCUMENTO FISCAL
    CreateEmpresaUseCase
    const { data: documento } = await supabase
      .from('documentos_fiscal')
      .insert({
        numero: 1,
        documento_tipo: 'FATURA', // depende do enum criado
        subtotal: 250000,
        total: 250000,
        imposto: 0,
        desconto: 0,
        empresa_id: empresaId,
        cliente_id: cliente!.id,
        moeda_id: moeda!.id,
        observacao: 'Documento inicial'
      })
      .select()
      .single()

    // 14. ARTIGO ITEM
    await supabase.from('artigo_itens').insert({
      artigo_id: tipoArtigo!.id,
      documento_fiscal_id: documento!.id,
      quantidade: 1
    })

    // 15. PAGAMENTO TIPO
    await supabase.from('pagamentos_tipo').insert({
      descricao: 'Dinheiro',
      empresa_id: empresaId
    })

    console.log('Seed executado com sucesso!')
  } catch (error) {
    console.error('Erro no seed:', error)
  }
}