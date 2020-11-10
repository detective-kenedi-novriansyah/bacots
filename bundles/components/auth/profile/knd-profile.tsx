import { Image } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { detailAuth } from '../../../actions/authActions'
import { ApplicationState } from '../../../configureStore'
import KndCard from '../../home/knd-card'

const KndProfile: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.data)
    const content = useSelector((state: ApplicationState) => state.auth.content)

    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            dispatch(detailAuth(location.search, history))
        }
        return () => {
            mounted = false
        }
    },[])


    const handleClickMove = (newValue: string) => {
        history.push(newValue)
    }
    return (
        <div className="knd-profile">
            <header>
                <button onClick={handleClickMove.bind('','/')}>
                    <i className="fas fa-arrow-left"></i>
                    {fields.button ? fields.button.back : ''}
                </button>
            </header>
            {is_authenticate.avatar ?
            <div className="row" id="knd-profil-rows">
                <div className="col-xs">
                    <div className="knd-profil">
                        <img src={is_authenticate.background} alt="" className="knd-profil-background"/>
                        <div className="knd-profil-author">
                            <img src={is_authenticate.avatar} alt="" className="knd-profil-author-avatar"/>
                            <a href="" className="knd-profil-author-nickname">
                                {is_authenticate.user.first_name}
                            </a>
                            <div className="knd-push"></div>
                            <button>
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xs">
                    <div className="knd-profile-card">
                        <KndCard content={content}/>
                    </div>
                </div>
            </div> : null }
        </div>
    )
}

export default KndProfile