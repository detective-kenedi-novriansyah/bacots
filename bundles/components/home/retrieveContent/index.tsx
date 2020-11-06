import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { Button, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveContent } from '../../../actions/contentActions'
import { ApplicationState } from '../../../configureStore'
import { FormProps, RetrieveContent } from '../../../constant/interface'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const RetrieveContentContext = React.createContext<Partial<ContextProps>>({})
export const RetrieveContentContextApp = () => {
    const dispatch = useDispatch()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const detail = useSelector((state: ApplicationState) => state.content.detail)
    const [state, setState] = React.useState<RetrieveContent>({
        description: '',
        loading: false,
        pk: 0
    })

    const onSubmit = (e: FormProps) : void => {
        e.preventDefault()
        const description = (document.getElementById('retrieve-description') as HTMLTextAreaElement)
        setState({
            ...state,
            loading: true
        })
        setTimeout(() => {
            const data = {
                description: description.value,
                pk: detail.id,
                loading: state.loading
            }
            dispatch(retrieveContent(data,setState))
        }, 500);
    }

    return <RetrieveContentContext.Consumer>
        {
            ({
                open, handleClickClose
            }) => {
                return (
                <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {fields.button ? fields.button.text_update : ''}
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={onSubmit} id="form-retrieve-content">
                            <div className="field">
                                <div className="control is-expanded">
                                    <Input.TextArea placeholder={fields.bacot ? fields.bacot.description : ''} defaultValue={detail.description} id="retrieve-description" required/>
                                </div>
                            </div>
                            <div className="field has-addons flex items-center">
                                <div className="flex-1"></div>
                                <div className="control">
                                    <Button type="dashed" shape="round" htmlType="submit" size="small" loading={state.loading}>
                                        {fields.button ? fields.button.update : ''}
                                    </Button>
                                </div>
                                <div className="control">
                                    <Button type="dashed" shape="round" size="small" className="ml-2" onClick={handleClickClose}>
                                        {fields.button ? fields.button.close : ''}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                )
            }
        }
    </RetrieveContentContext.Consumer>
}