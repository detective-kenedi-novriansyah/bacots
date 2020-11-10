import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core'
import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { destroyContent } from '../../../actions/contentActions'
import { ApplicationState } from '../../../configureStore'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DestroyContent = React.createContext<Partial<ContextProps>>({})
export const DestroyContentApp = () => {
    let choice: boolean = false;
    if(window.location.pathname === "/profile") {
      choice = true
    }

    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<boolean>(false)
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const detail = useSelector((state: ApplicationState) => state.content.detail)
    const activeRouter = useSelector((state: ApplicationState) => state.content.softDetail)
    const history = useHistory()

    const handleClickDestroyContent = (e: React.MouseEvent<HTMLButtonElement>) : void => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            dispatch(destroyContent(detail.id,setLoading,activeRouter,history,choice))
        }, 900);
    }
    return <DestroyContent.Consumer>
        {
            ({
                open, handleClickClose
            }) => {
                return (
                    <Dialog open={open ? true : false} onClose={handleClickClose} aria-labelledby="knd-title-options-dialog"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle>
                            <div id="knd-title-options-dialog">
                                {fields.button ? fields.button.text_delete : ''}
                            </div>
                        </DialogTitle>
                        <DialogContent>
                            <div className="knd-home-dialog-destroy">
                                <p>{detail.description}</p>
                                <div>
                                    {loading ?
                                    <div className="knd-home-dialog-destroy-loader">
                                        <i className="fas fa-trash"></i>
                                    </div> : null }
                                    <div className="knd-push"></div>
                                    <button className="knd-home-dialog-destroy-btn" onClick={handleClickDestroyContent} disabled={loading}>
                                        {fields.button ? fields.button.delete : ''}
                                    </button>
                                    <button className="knd-home-dialog-destroy-btn" onClick={handleClickClose}>
                                        {fields.button ? fields.button.close : ''}
                                    </button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                )
            }
        }
    </DestroyContent.Consumer>
}