import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { detailAuth } from '../../actions/authActions'
import { ApplicationState } from '../../configureStore'
import { fetchDetailContent } from '../../actions/contentActions'
import NavbarNotification from './notification'
import NavbarSettings from './settings'

const Navbar: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)
    const is_info = useSelector((state: ApplicationState) => state.auth.notification)
    const dispatch = useDispatch()
    const history = useHistory()
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const [openSettings, setOpenSettings] = React.useState(false);
    const anchorRefSettings = React.useRef<HTMLButtonElement>(null);
  
    const handleToggleSettings = () => {
      setOpenSettings((prevOpen) => !prevOpen);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClickHistory = (newValue: string) => {
        history.push(newValue)
    }

    const onClickMoveProfile = (newValue: string) => {
        dispatch(detailAuth(newValue,history))
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
      
        setOpen(false);
    }

    const onClickDetailContent = (newValue: string) => {
        dispatch(fetchDetailContent(newValue,history))
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
      
        setOpen(false);
    }

    return (
        <header>
            <nav className="knd-navbar">
                <div className="knd-navbar-first">
                    <img src={fields.button ? fields.button.logo : ''} alt=""/>
                    <button onClick={handleClickHistory.bind('','/')}>
                        <i className="fas fa-home"></i>
                    </button>
                    <button>
                        <i className="fas fa-globe-asia"></i>
                    </button>
                </div>
                <div className="knd-navbar-input">
                    <input type="text" placeholder="Search ..."/>
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                {localStorage.getItem('token') ? (
                    <div className="knd-navbar-group-button-auth">
                        <button className="knd-navbar-button-auth-x">
                            <i className="fas fa-comment-alt"></i>
                        </button>
                        <button className="knd-navbar-button-auth-x" ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}>
                            <i className="fas fa-bell"></i>
                        </button>
                        <NavbarNotification
                            open={open}
                            setOpen={setOpen}
                            anchorRef={anchorRef}
                            onClickMoveProfile={onClickMoveProfile}
                            onClickDetailContent={onClickDetailContent}
                            is_info={is_info}/>
                        <img src={is_authenticate.avatar} alt="" onClick={onClickMoveProfile.bind(is_authenticate,is_authenticate.public_id)}/>
                        <button className="knd-navbar-button-auth-x" ref={anchorRefSettings}
                            aria-controls={openSettings ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggleSettings}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                        <NavbarSettings
                            openSettings={openSettings}
                            setOpenSettings={setOpenSettings}
                            anchorRefSettings={anchorRefSettings}
                            />
                    </div>
                ):(
                <div className="knd-navbar-group-button-auth">
                    <button className="knd-navbar-button-auth" onClick={handleClickHistory.bind('','/signin')}>
                        {fields.button ? fields.button.signin : ''}
                    </button>
                    <button className="knd-navbar-button-auth" onClick={handleClickHistory.bind('','/signup')}>
                        {fields.button ? fields.button.create_new_account : ''}
                    </button>
                </div>)}
                <div className="knd-navbar-bottom">
                    <button>
                        <i className="fas fa-home"></i>
                    </button>
                    <button>
                        <i className="fas fa-globe-asia"></i>
                    </button>
                    <button>
                        <i className="fas fa-comment-alt"></i>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar