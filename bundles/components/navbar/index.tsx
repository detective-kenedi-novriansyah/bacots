import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ApplicationState } from '../../configureStore'

const Navbar: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const history = useHistory()
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)

    const handleClickHistory = (newValue: string) => {
        history.push(newValue)
    }
    return (
        <header>
            <nav className="knd-navbar">
                <img src={fields.button ? fields.button.logo : ''} alt=""/>
                <div className="knd-navbar-filter">
                    <input type="text" placeholder="Search"/>
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="knd-push"></div>
                {localStorage.getItem('token') ? (
                    <div className="knd-navbar-group-is">
                        <button>
                            <i className="fas fa-home"></i>
                        </button>
                        <button>
                            <i className="fas fa-globe-asia"></i>
                        </button>
                        <button>
                            <i className="fas fa-comments"></i>
                        </button>
                        <button>
                            <i className="fas fa-bell"></i>
                        </button>
                        <img src={is_authenticate.avatar} alt=""/>
                    </div>
                ):(
                    <div className="knd-navbar-group">
                        <button onClick={handleClickHistory.bind('','/signin')}>
                            {fields.button ? fields.button.signin : ''}
                        </button>
                        <button onClick={handleClickHistory.bind('','/signup')}>
                            {fields.button ? fields.button.create_new_account : ''}
                        </button>
                    </div>
                )}
                {localStorage.getItem('token') ? (
                    <div className="knd-navbar-bottom">
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                        <button>
                            <i className="fas fa-globe-asia"></i>
                        </button>
                        <button>
                            <i className="fas fa-comments"></i>
                        </button>
                        <button>
                            <i className="fas fa-bell"></i>
                        </button>
                    </div>
                ) : null}
            </nav>
        </header>
    )
}

export default Navbar