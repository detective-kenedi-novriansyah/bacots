import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destroyContent } from '../../../actions/contentActions'
import { ApplicationState } from '../../../configureStore'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export const DestroyContent = React.createContext<Partial<ContextProps>>({})
export const DestroyContentApp = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState<boolean>(false)
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const detail = useSelector((state: ApplicationState) => state.content.detail)

    const handleClickDestroyContent = (e: React.MouseEvent<HTMLButtonElement>) : void => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => {
            dispatch(destroyContent(detail.id,setLoading))
        }, 500);
    }
    return <DestroyContent.Consumer>
        {
            ({
                open, handleClickClose
            }) => {
                return (
                    <Dialog open={open} onClose={handleClickClose} aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title">
                                {fields.button ? fields.button.text_delete : ''}
                            </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {detail ? detail.description : ''}
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button type="dashed" onClick={handleClickDestroyContent} loading={loading}>
                                    {fields.button ? fields.button.yes : ''}
                                </Button>
                                <Button type="dashed" onClick={handleClickClose}>
                                    {fields.button ? fields.button.no : ''}
                                </Button>
                                </DialogActions>
                    </Dialog>
                )
            }
        }
    </DestroyContent.Consumer>
}