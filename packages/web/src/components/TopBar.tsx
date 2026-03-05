import { Box, Button, DialogContent, DialogTitle, Divider, Dropdown, Menu, MenuButton, MenuItem, Modal, ModalClose, ModalDialog, Tooltip } from "@mui/joy";
import { AccountCircle as UserIcon, Logout as LogoutIcon, ArrowDropDown } from '@mui/icons-material';
import Logo from "./Logo";
import { useUserStore } from "../stores/useUserStore";
import { Activity, useState, type HTMLAttributes, type ReactNode } from "react";
import type { IAuthProvider } from "@likkida/shared";
import { AuthProviderAxios } from "../infra/providers/AuthProvider";
import { useDesfragmentedToast } from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import NavigatorGuide from "./NavigatorGuide";
type TProps = HTMLAttributes<HTMLDivElement> & { children?: ReactNode }
const authProvider: IAuthProvider = new AuthProviderAxios()
export default function TopBar({ className, ...props }: TProps) {
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const isAuthenticated = useUserStore(state => state.isAuthenticated)
  const { showToast } = useDesfragmentedToast()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [openDialogLogOut, setOpenDialogLogOut] = useState(false)
  const handleLogout = () => {
    authProvider.logout()
      .then(() => {
        showToast('Logout feito com sucesso', { color: 'success' })
        queryClient.invalidateQueries({ queryKey: ['auth.me'] })
          .then(() => {
            setUser(null)
            navigate('/')
          })
      })
      .catch(() => {
        showToast('Erro ao fazer Logout ', { color: 'danger' })
      })
  }

  return (

    <>
      <Box {...props} className={`${className} px-6 flex items-center justify-between h-12 w-full bg-(--joy-palette-background-level1) border-b border-default`}>
        <div className="flex items-center">
          <Logo labelVisible={false} />
          <Activity mode={isAuthenticated() ? 'visible' : 'hidden'}>
            <NavigatorGuide />
          </Activity>
        </div>
        <div>
          <Activity mode={isAuthenticated() ? 'visible' : 'hidden'}>
            <Dropdown>
              <Tooltip title={user?.username}>
                <MenuButton variant="plain" endDecorator={<ArrowDropDown className="text-[30px]!" />}>
                  <UserIcon />
                </MenuButton>
              </Tooltip>
              <Menu>
                <MenuItem >
                  <span className="text-black!"> {user?.username}</span>
                </MenuItem>
                <MenuItem onClick={() => setOpenDialogLogOut(true)}>
                  <LogoutIcon sx={{ color: 'var(--joy-palette-danger-500)' }}></LogoutIcon> Logout
                </MenuItem>
              </Menu>
            </Dropdown>
          </Activity>
        </div>
      </Box>

      <Modal open={openDialogLogOut} onClose={() => setOpenDialogLogOut(false)}>
        <ModalDialog size="md" variant="outlined" role="alertdialog" minWidth={480} >
          <ModalClose />
          <DialogTitle>Sair do Likkida</DialogTitle>
          <Divider sx={{ marginBlock: 1 }}></Divider>
          <DialogContent>
            <div>
              Deseja realmente fazer o Logout?
            </div>

            <div className="flex justify-end gap-x-3 pt-3">
              <Button color="neutral" variant="soft" onClick={() => setOpenDialogLogOut(false)}>Cancelar</Button>
              <Button color="danger" onClick={() => handleLogout()}>Sair</Button>
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  )
}