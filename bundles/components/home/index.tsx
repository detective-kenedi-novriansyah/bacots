import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContent } from '../../actions/contentActions'
import { ApplicationState } from '../../configureStore'
import KndCard from './knd-card'
import KndForm from './knd-form'

const Home: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const content = useSelector((state: ApplicationState) => state.content.content)

    React.useEffect(() => {
        let mounted = true
        if(mounted) {
            dispatch(fetchContent())
        }
        return () => {
            mounted = false
        }
    },[])
    return (
        <section>
            <div>
                <div className="row" id="knd-home-custom-rows">
                    <div className="col-xs">
                        <div className="box">dqwdqdw</div>
                    </div>
                    <div className="col-xs">
                        <KndForm/>
                        <KndCard content={content}/>
                    </div>
                    <div className="col-xs">
                        <div className="box">mkdwqmkdwqmkdqw</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
