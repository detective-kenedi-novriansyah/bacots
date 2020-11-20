import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { fetchContent, fetchPublic } from '../../actions/contentActions'
import { ApplicationState } from '../../configureStore'
import KndCard from './knd-card'
import KndForm from './knd-form'
import KndSideLeft from './sideLeft'

const Home: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const content = useSelector((state: ApplicationState) => state.content.content)
    const is_active_public = useSelector((state: ApplicationState) => state.content.publicActive)
    const pathname = window.location.pathname
    const history = useHistory()
    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            if(pathname === "/") {
                dispatch(fetchContent(history))
            } else {
                dispatch(fetchPublic(history))
            }
        }
        return () => {
            mounted = false
        }
    },[])

    return (
        <section>
            <div className="knd-home-custom-rows">
                <div id="knd-home-custom-rows">
                    <div className="knd-home-custom-col-xs">
                        <KndSideLeft/>
                    </div>
                    <div className="knd-home-custom-col-xs">
                        {is_active_public ? null : <KndForm/> }
                        <KndCard content={content}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
