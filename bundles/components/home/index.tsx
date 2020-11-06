import { Button } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'

const Home: React.FunctionComponent = () => {
    const content = useSelector((state: ApplicationState) => state.content.content)
    return (
        <section>
            {content.map((base, index) => (
                <div key={index} className="my-1">
                    <div className="flex items-center">
                        <Avatar src={base.author.avatar}/>
                        <Button type="link" size="small" className="text-xs font-sans">
                            {base.author.user.first_name}
                        </Button>
                    </div>
                    <p className="text-xs font-sans">{base.description}</p>
                </div>
            ))}
        </section>
    )
}

export default Home