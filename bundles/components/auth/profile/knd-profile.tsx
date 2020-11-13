import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { detailAuth, openDialogFollow, requestFollow } from '../../../actions/authActions'
import { ApplicationState } from '../../../configureStore'
import KndCard from '../../home/knd-card'

const KndProfile: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.data)
    const is_active = useSelector((state: ApplicationState) => state.auth.is_active_follow)
    const content = useSelector((state: ApplicationState) => state.auth.content)

    const follow = fields.button ? fields.button.follow : ''
    const message = fields.button ? "Message" : ''

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

    const onClickFollower = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const data = {
            user: localStorage.getItem('token_id').split('$')[1] as string,
            followers: is_authenticate.id
        }
        dispatch(requestFollow(data))
    }

    const handleClickShowFollow = (e: string) => {
        const data = {
            followers: e === "followers" ? true : false,
            followed: e === "followed" ? true : false
        }
        dispatch(openDialogFollow(data))
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
                        </div>
                        <div className="knd-profile-follow-x">
                            <button className="knd-profile-follow-btn" onClick={onClickFollower}>
                                {is_active ? message : follow}
                            </button>
                            <div className="knd-profil-follow">
                                <div className="knd-profile-follow-group">
                                    <span>
                                        {is_authenticate.followers_count}
                                    </span>
                                    <button onClick={handleClickShowFollow.bind('', 'followers')}>
                                        {fields.button ? fields.button.followers : ''}
                                    </button>
                                </div>
                                <div className="knd-profile-follow-group">
                                    <span>
                                        {is_authenticate.followed_count}
                                    </span>
                                    <button onClick={handleClickShowFollow.bind('','followed')}>
                                        {fields.button ? fields.button.followed : ''}
                                    </button>
                                </div>
                            </div>
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