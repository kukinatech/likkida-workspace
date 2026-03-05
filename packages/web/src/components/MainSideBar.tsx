import { Button, Tooltip } from "@mui/joy";
import type { HTMLAttributes, ReactNode } from "react";
import { Article, Home, Sync, Inventory, PeopleAlt, Menu, Settings } from '@mui/icons-material';
import { Link, useLocation } from "react-router";
import { cn } from "../utils/tailwindMarge";
import { useNavigatorBarStore } from "../stores/useNavigatorBarStore";

type TProps = HTMLAttributes<HTMLDivElement> & { children?: ReactNode }

const menuItems: {
  tooltip: string,
  pathname: string,
  Icon: any
}[] = [

    {
      Icon: Home,
      pathname: "/dashboard",
      tooltip: "Dashboard"
    },
    {
      Icon: Article,
      pathname: "/documentos",
      tooltip: "Documentos",
    },
    {
      Icon: Sync,
      pathname: "/movimentos",
      tooltip: "Fluxo de caixa"
    },
    {
      Icon: Inventory,
      pathname: "/artigos",
      tooltip: "Artigos"
    },
    {
      Icon: PeopleAlt,
      pathname: "/clientes",
      tooltip: "Clientes"
    },
  ]
export default function MainSideBar({ className, ...props }: TProps) {

  const { pathname } = useLocation()
  const toogleNavigatorBar = useNavigatorBarStore(state => state.toogle)
  return (
    <aside {...props} className={`${className} flex flex-col`}>
      <div className="flex-1 flex flex-col  w-full items-center overscroll-y-auto">
        <Tooltip title="Ver mais opções" placement="right">
          <Button className="w-full flex justify-center py-3" onClick={toogleNavigatorBar} >
            <Menu sx={{ fontSize: '50px', fill: '#FFF' }}></Menu>
          </Button>
        </Tooltip>
        {menuItems.map((menuItem) => (
          <Tooltip title={menuItem.tooltip} placement="right" >
            <Link to={menuItem.pathname} className={cn("hover:bg-(--joy-palette-primary-700) duration-300 w-full flex justify-center py-3", pathname.includes(menuItem.pathname) && 'bg-(--joy-palette-primary-700)')}>
              <menuItem.Icon sx={{ fontSize: '50px', fill: '#FFF' }}></menuItem.Icon>
            </Link>
          </Tooltip>
        ))}
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
