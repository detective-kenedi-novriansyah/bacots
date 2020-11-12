import React from 'react'
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { revokedUser } from '../../../actions/userActions'
import { ApplicationState } from '../../../configureStore'
import { useHistory } from 'react-router'

interface NavbarSettingsProps {
    openSettings: boolean;
    setOpenSettings: React.Dispatch<React.SetStateAction<boolean>>
    anchorRefSettings: React.RefObject<HTMLButtonElement>
}

interface ShowSettings {
  loading: boolean;
  show: boolean;
}

const NavbarSettings: React.FunctionComponent<NavbarSettingsProps> = (props: React.PropsWithChildren<NavbarSettingsProps>) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const {openSettings, setOpenSettings, anchorRefSettings} = props
    const [showSettings, setShowSettings] = React.useState<ShowSettings>({
      loading: false,
      show: false
    })


    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRefSettings.current && anchorRefSettings.current.contains(event.target as HTMLElement)) {
          return;
        }
    
        setOpenSettings(false);
      };
    
      function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpenSettings(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(openSettings);
      React.useEffect(() => {
        if (prevOpen.current === true && openSettings === false) {
          anchorRefSettings.current!.focus();
        }
    
        prevOpen.current = openSettings;
      }, [openSettings]);

      const handleClickHistory = (newValue: string) => {
        setShowSettings({
          ...showSettings,
          loading: true
        })
        setTimeout(() => {
          setShowSettings({
            ...showSettings,
            loading: false,
            show: showSettings.show ? false : true
          })
          history.push(newValue)
        }, 400);
        if (anchorRefSettings.current && anchorRefSettings.current.contains(event.target as HTMLElement)) {
          return;
        }
    
        setOpenSettings(false);
      }

      const handleClickRevokedToken = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(revokedUser(history))
        if (anchorRefSettings.current && anchorRefSettings.current.contains(event.target as HTMLElement)) {
          return;
        }
    
        setOpenSettings(false);
    }

    const handleClickShowSettings = (news: React.MouseEvent<HTMLButtonElement>) => {
      news.preventDefault()
      setShowSettings({
        ...showSettings,
        loading: true,
      })
      setTimeout(() => {
        setShowSettings({
          ...showSettings,
          loading: false,
          show: showSettings.show ? false : true
        })
      }, 400);
    }

    return (
        <Popper open={openSettings} anchorEl={anchorRefSettings.current} role={undefined} transition disablePortal className="knd-navbar-dropdown-set">
        {({ TransitionProps, placement }) => (
            <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
            <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openSettings} className="knd-navbar-menu-list" onKeyDown={handleListKeyDown} id="knd-menu-list-first">
                  <div className="knd-navbar-menu-item-group">
                    <button className="knd-navbar-menu-item" onClick={handleClickShowSettings}>
                        <i className="fas fa-cog"></i>
                        {fields.button ? fields.button.settings : ''}
                    </button>
                    <div className={showSettings.loading ? "knd-navbar-menu-item-loader" : "knd-navbar-menu-item-loader-hide"}></div>
                    <button className="knd-navbar-menu-item" id={showSettings.show ? "" : "knd-navbar-menu-item"} onClick={handleClickHistory.bind('','/editprofile')}>
                      {fields.button ? fields.button.edit_profile : ''}
                    </button>
                    <button className="knd-navbar-menu-item" id={showSettings.show ? "" : "knd-navbar-menu-item"} onClick={handleClickHistory.bind('','/personalinformation')}>
                      {fields.button ? fields.button.personal_information : ''}
                    </button>
                    <button className="knd-navbar-menu-item" id={showSettings.show ? "" : "knd-navbar-menu-item"} onClick={handleClickHistory.bind('','/changepassword')}>
                      {fields.button ? fields.button.change_password : ''}
                    </button>
                    <button className="knd-navbar-menu-item" onClick={handleClickRevokedToken}>
                        <i className="fas fa-sign-out-alt"></i>
                        {fields.button ? fields.button.logout : ''}
                    </button>
                  </div>
                </MenuList>
                </ClickAwayListener>
            </Paper>
            </Grow>
        )}
        </Popper>
    )
}

export default NavbarSettings