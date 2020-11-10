import { Dialog, DialogContent, DialogTitle, TextField } from '@material-ui/core'
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

    let choice: boolean = false;
    if(window.location.pathname === "/profile") {
      choice = true
    }

    const dispatch = useDispatch()
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const detail = useSelector((state: ApplicationState) => state.content.detail)
    const activeSoft = useSelector((state: ApplicationState) => state.content.softDetail)
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
            dispatch(retrieveContent(data,setState,activeSoft,choice))
        }, 500);
    }

    return <RetrieveContentContext.Consumer>
        {
            ({
                open, handleClickClose
            }) => {
                return (
                <Dialog open={open ? true : false} onClose={handleClickClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="md">
                    <DialogTitle id="form-dialog-title">
                        <div id="knd-title-options-dialog">
                            {fields.button ? fields.button.text_update : ''}
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={onSubmit} className="knd-dialog-form-retrieve">
                            <TextField id="retrieve-description" type="text" placeholder={fields.bacot ? fields.bacot.description : ''} label={fields.bacot ? fields.bacot.description : ''} multiline fullWidth rows={4} defaultValue={detail.description}/>
                            <div>
                                {state.loading ?
                                <div className="knd-dialog-form-retrieve-loader">
                                    <i className="fas fa-pen-alt"></i>
                                </div> : null }
                                <div className="knd-push"></div>
                                <button type="submit" disabled={state.loading}>
                                    {fields.button ? fields.button.update : ''}
                                </button>
                                <button type="button" onClick={handleClickClose}>
                                    {fields.button ? fields.button.close : ''}
                                </button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
                )
            }
        }
    </RetrieveContentContext.Consumer>
}