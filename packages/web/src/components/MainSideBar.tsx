import { Tooltip } from "@mui/joy";
import type { HTMLAttributes, ReactNode } from "react";
import { Article, Home, Sync, Inventory, PeopleAlt, Menu, Settings } from '@mui/icons-material';
import { Link } from "react-router";

type TProps = HTMLAttributes<HTMLDivElement> & { children?: ReactNode }
export default function MainSideBar({ className, ...props }: TProps) {
  return (
    <aside {...props} className={`${className} flex flex-col`}>
      <div className="flex-1 flex flex-col gap-y-6 w-full items-center overscroll-y-auto">
        <Tooltip title="Ver mais opções" placement="right">
          <Menu sx={{ fontSize: '50px', fill: '#FFF' }}></Menu>
        </Tooltip>
        <Tooltip title="Dashboard" placement="right">
          <Link to="/dashboard">
            <Home sx={{ fontSize: '50px', fill: '#FFF' }} ></Home>

          </Link>
        </Tooltip>
        <Tooltip title="Documentos" placement="right">
          <Link to="/documentos">
            <Article sx={{ fontSize: '50px', fill: '#FFF' }}></Article>
          </Link>
        </Tooltip>
        <Tooltip title="Fluxo de caixa" placement="right">
          <Link to="/movimentos">
            <Sync sx={{ fontSize: '50px', fill: '#FFF' }}></Sync>
          </Link>
        </Tooltip>
        <Tooltip title="Produtos e Serviços" placement="right">
          <Link to="/produtos-servicos">
            <Inventory sx={{ fontSize: '50px', fill: '#FFF' }}></Inventory>
          </Link>
        </Tooltip>
        <Tooltip title="Clientes" placement="right">
          <Link to="/clientes">
            <PeopleAlt sx={{ fontSize: '50px', fill: '#FFF' }}></PeopleAlt>
          </Link>
        </Tooltip>
      </div>
      <div className="flex gap-y-6 w-full justify-center py-3">
        <Tooltip title="configurações" placement="right">
          <Link to="/configuracoes">
            <Settings sx={{ fontSize: '50px', fill: '#FFF' }}></Settings>
          </Link>
        </Tooltip>
      </div>
    </aside>
  )
}
