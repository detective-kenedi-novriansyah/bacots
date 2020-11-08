import React from 'react'
import KndCard from './knd-card'
import KndForm from './knd-form'

const Home: React.FunctionComponent = () => {
    return (
        <section>
            <div id="container-content-bacot">
                <div className="row">
                    <div className="col-xs">
                        <div className="box">dqwdqdw</div>
                    </div>
                    <div className="col-xs">
                        <KndForm/>
                        <KndCard/>
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