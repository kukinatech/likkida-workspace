import { Email } from "../valueObjects/Email";
import { Nif } from "../valueObjects/Nif";

export type TEmpresa = {
    id: string;
    nome: string;
    nif: string;
    email: string;
    contactos: string[]
    endereco: string
    logoUrl: string | null
}
export type TCreateEmpresaInputDTO = Omit<TEmpresa, 'id' | 'logoUrl'> & Pick<Partial<TEmpresa>, 'logoUrl'>
export type TCreateEmpresaOutputDTO = TEmpresa
export class Empresa {
    id?: string
    nome: string;
    nif: Nif;
    email: Email;
    contactos: string[]
    endereco: string
    logoUrl?: string | null;

    constructor({ nome, nif, email, endereco, contactos, logoUrl }: TCreateEmpresaInputDTO) {
        this.nome = nome;
        this.nif = new Nif(nif);
        this.email = new Email(email);
        this.endereco = endereco;
        this.contactos = contactos;
        this.logoUrl = logoUrl ?? null;
    }
}   