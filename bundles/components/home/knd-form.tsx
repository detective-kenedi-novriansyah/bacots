import { Spin } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { recordContent } from '../../actions/contentActions'
import { ApplicationState } from '../../configureStore'
import { RecordContent, TextareaProps, FormProps } from '../../constant/interface'

const KndForm: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const [state, setState] = React.useState<RecordContent>({
        description: '',
        user: '',
        loading: false
    })

    const onChange = (e: TextareaProps) : void => {
        setState({
            ...state,
            description: e.currentTarget.value
        })
    }
    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        const user_id = localStorage.getItem('token_id').split('$')[1]
        setState({
            ...state,
            loading: true
        })
        const data = {
            user: user_id,
            description: state.description,
            loading: false
        }
        setTimeout(() => {
            dispatch(recordContent(data,setState))
        }, 500);
    }

    return (
        <section>
            <form onSubmit={onSubmit} id="knd-form-bacot">
                <textarea name="description" onChange={onChange} value={state.description} className="textarea has-fixed-size" id="knd-textarea" placeholder={fields.bacot ? fields.bacot.description : ''}></textarea>
                <div id="knd-btn-group">
                    <button type="submit" disabled={state.loading}>
                        {fields.button ? fields.button.post : ''}
                    </button>
                    <div id="knd-push"></div>
                    {state.loading ?  <Spin className="knd-spin"/> : null }
                </div>
            </form>
        </section>
    )
}

export default KndForm