import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../configureStore'
import _ from 'lodash'
import { detailAuth } from '../../../actions/authActions'
import { useHistory } from 'react-router'
import { ContentTypes } from '../../../constant/contentSchema'
import { recordReport } from '../../../actions/reportActions'

interface ContextProps {
    open: boolean;
    handleClickClose(e: React.MouseEvent<HTMLElement>) : void;
}

export interface ReportActive {
    choice: number;
    report: string;
}

export const DialogReportContext = React.createContext<Partial<ContextProps>>({})
export const DialogReportContextApp = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    const content = useSelector((state: ApplicationState) => state.content.detail)
    const activeRouter = useSelector((state: ApplicationState) => state.content.activeReport)
    const history = useHistory()
    const dispatch = useDispatch()
    const [active, setActive] = React.useState<ReportActive>({
        choice: -1,
        report: ''
    })

    const [loading, setLoading] = React.useState<boolean>(false)

    const onClickChoice = (newInte: number) => {
        setActive({
            ...active,
            choice: newInte
        })
    }
    const onClickReport = (newValue: string) => {
        setActive({
            ...active,
            report: newValue
        })
    }

    const onClickMoveToProfile = (newValue: string) => {
        dispatch({
            type: ContentTypes.CLOSE_DIALOG,
            payload: {
                openDialog: false,
                openRetrieveDialog: false,
                openDialogReport: false
            }
        })
        dispatch(detailAuth(newValue,history))
    }

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLoading(true)
        let data: any
        setTimeout(() => {
            if(active.report === fields.report.block) {
                data = {
                    user: localStorage.getItem('token_id').split('$')[1] as string,
                    choice: active.choice,
                    block: content.author.id,
                    content: content.id
                }
            } else {
                data = {
                    user: localStorage.getItem('token_id').split('$')[1] as string,
                    choice: active.choice,
                    unfollow: content.author.id,
                    content: content.id
                }
            }
            dispatch(recordReport(data,setLoading,active,setActive,activeRouter,history))
        }, 500);
    }

    const author = content.author ? content.author.public_id : ''
    return <DialogReportContext.Consumer>
        {
            ({open, handleClickClose}) => {
                return (
                    <Dialog open={open} onClose={handleClickClose}>
                        <DialogContent>
                            {fields.report ? 
                            <div className="knd-report">
                                <div className="knd-report-closed">
                                    <button onClick={handleClickClose}>
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                </div>
                                <div className="knd-report-header">
                                    {fields.report.title}
                                </div>
                                <div className="knd-report-description">
                                    <div className="knd-report-content">
                                        {_.map(fields.report.choice,((base, index) => (
                                            <div className="knd-report-table" key={index}>
                                                <button className={active.choice === base.number ? "knd-report-button-active" : "knd-report-button"} onClick={onClickChoice.bind(base,base.number)}>
                                                    {base.name}
                                                </button>
                                            </div>
                                        )))}
                                    </div>
                                    <div className="knd-report-description-text">
                                        <p>
                                            {content.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="knd-report-author">
                                    <div className="knd-report-author-group" onClick={onClickMoveToProfile.bind(content, author)}>
                                        <img src={content.author ? content.author.avatar : ''} alt="" className="knd-report-author-avatar"/>
                                        <a>
                                            {content.author ? content.author.user.first_name : ''}
                                        </a>
                                    </div>
                                    <div className="knd-report-actions">
                                        <button className={active.report === fields.report.block ? "knd-report-actions-btn-active" : "knd-report-actions-btn"} onClick={onClickReport.bind(fields, fields.report.block)}>{fields.report.block}</button>
                                        <button className={active.report === fields.report.unfollow ? "knd-report-actions-btn-active" : "knd-report-actions-btn"} onClick={onClickReport.bind(fields, fields.report.unfollow)}>{fields.report.unfollow}</button>
                                    </div>
                                </div>
                                <div className="knd-report-actions-footer">
                                    <button className="knd-report-actions-footer-btn" onClick={onSubmit} disabled={loading}>
                                        {fields.button.submit}
                                    </button>
                                </div>
                            </div> : null }
                        </DialogContent>
                    </Dialog>
                )
            }
        }
    </DialogReportContext.Consumer>
}