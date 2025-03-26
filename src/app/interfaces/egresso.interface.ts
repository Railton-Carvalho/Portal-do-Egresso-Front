export interface IEgresso {

    id: number
    nome: string
    senha: string
    userStatus: string
    email: string
    cpf: string
    resumo: string
    url_foto: string
    oportunidadesEnviadas: string[]
    createdAt: string
    updatedAt: string
    homologadoStatus: string
    accountNonExpired: boolean
    credentialsNonExpired: boolean
    accountNonLocked: boolean
    password: string
    authorities: any[]
    username: string
    enabled: boolean
    _links: any

}

export interface IEgressoCreate {

    nome: string,
    cpf: string,
    email: string,
    status: string,
    senha: string | null,
    resumo: string,
    homologado: string,
    idCurso: number,
    Ano_inicio: number,
    Ano_fim: number,
    ano_inicio: number,
    ano_fim: number, 

}