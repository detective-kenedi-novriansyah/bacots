import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { detailAuth } from '../../../actions/authActions'
import { ApplicationState } from '../../../configureStore'
import _ from 'lodash'

const KndSideLeft: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const is_authenticate = useSelector((state: ApplicationState) => state.auth.is_authenticate)
    const history = useHistory()
    const dispatch = useDispatch()

    const onClickGoToProfile = (newValue: string) => {
        dispatch(detailAuth(newValue,history))
    }
    
    const handleClickHistory = (newValue: string) => {
        history.push({
            pathname: '/legal',
            search: newValue
        })
    }
    return (
        <section className="knd-side-left-is-authenticate-x">
            <img src={is_authenticate.background} alt="" className="knd-side-left-is-authenticate-background"/>
            <div className="knd-side-left-is-authenticate">
                <img src={is_authenticate.avatar} alt="" className="knd-side-left-is-authenticate-avatar"/>
                <a onClick={onClickGoToProfile.bind(is_authenticate,is_authenticate.public_id)} className="knd-side-left-is-authenticate-nickname">
                    {is_authenticate.user ? is_authenticate.user.first_name : ''}
                </a>
            </div>
            <div className="knd-side-left-is-authenticate-group">
                <div className="knd-side-left-is-authenticate-group-butt">
                    <span>
                        {is_authenticate.followers_count}
                    </span>
                    <button>
                        {fields.button ? fields.button.followers : ''}
                    </button>
                </div>
                <div className="knd-side-left-is-authenticate-group-butt">
                    <span>
                        {is_authenticate.followed_count}
                    </span>
                    <button>
                        {fields.button ? fields.button.followed : ''}
                    </button>
                </div>
            </div>
            <ul>
                {_.map(fields.options ? fields.options.options : [], ((base, index) => (
                    <li key={index}>
                        <a onClick={handleClickHistory.bind(base, base.name)}>{base.name}</a>
                    </li>
                )))}
            </ul>
            {/* Privasi  · Ketentuan  · Iklan  · Pilihan Iklan   · Cookie  · Lainnya  · Facebook © 2020
            Tentang Karier Developer Bantuan */}
        </section>
    )
}

export default KndSideLeft