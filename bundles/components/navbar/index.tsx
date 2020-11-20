import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { detailAuth, fetchAuth, filterAuth } from '../../actions/authActions'
import { ApplicationState } from '../../configureStore'
import { fetchContent, fetchDetailContent, fetchPublic } from '../../actions/contentActions'
import NavbarNotification from './notification'
import NavbarSettings from './settings'

const Navbar: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)
    const sizes = window.innerWidth
    let activeMobile: boolean = false
    if(767 > sizes) {
        activeMobile = true
    }
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

    const handleClickGoToPublic = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(fetchPublic(history))
    }

    const onClickGoToHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(fetchContent(history))
    }

    const handleClickFetchAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fetchAuth(activeMobile))
    }

    const onClickFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const data = (document.getElementById('knd-filter-user-first-name') as HTMLInputElement)
        if (data.value) {
            dispatch(filterAuth(data.value))
        }
    }

    return (
        <header>
            <nav className="knd-navbar">
                <div className="knd-navbar-first">
                    <img src={fields.button ? fields.button.logo : ''} alt=""/>
                    {localStorage.getItem('token') ? 
                    <button onClick={onClickGoToHome}>
                        <i className="fas fa-home"></i>
                    </button> : null }
                    {localStorage.getItem('token') ? 
                    <button onClick={handleClickGoToPublic}>
                        <i className="fas fa-globe-asia"></i>
                    </button> : null }
                </div>
                {localStorage.getItem('token') ? 
                <div className="knd-navbar-input">
                    <input type="text" placeholder="Search ..." onClick={handleClickFetchAuth} id="knd-filter-user-first-name"/>
                    <button onClick={onClickFilter}>
                        <i className="fas fa-search"></i>
                    </button>
                </div> : null }
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
                            is_info={is_authenticate.notification_default}/>
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
                ): null }
                {localStorage.getItem('token') ? 
                <div className="knd-navbar-bottom">
                    <button onClick={onClickGoToHome}>
                        <i className="fas fa-home"></i>
                    </button>
                    <button onClick={handleClickGoToPublic}>
                        <i className="fas fa-globe-asia"></i>
                    </button>
                    <button onClick={handleClickFetchAuth}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button>
                        <i className="fas fa-comment-alt"></i>
                    </button>
                </div> : null }
            </nav>
        </header>
    )
}

export default Navbar