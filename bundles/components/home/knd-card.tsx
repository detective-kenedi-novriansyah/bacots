import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../configureStore";
import _ from "lodash";
import { Grow, TextField } from "@material-ui/core";
import moment from "moment";
import {
  destroyComment,
  recordComment,
  requestLikesContent,
  detailContent,
  contentOpenDialogDestroy,
  contentOpenDialogRetrieve,
  openDialogReport,
} from "../../actions/contentActions";
import {
  CommentContent,
  Content,
  DestroyCommentDetail,
  FormProps,
} from "../../constant/interface";
import { useHistory } from "react-router";
import { detailAuth } from "../../actions/authActions";

interface KndCardProps {
  content: Content[]
}

const KndCard: React.FunctionComponent<KndCardProps> = (props: React.PropsWithChildren<KndCardProps>) => {
  const is_active = localStorage.getItem('token_id') ? localStorage.getItem('token_id_').split('$')[1] : ''
  let choice: boolean = false;
  if(window.location.pathname === "/profile") {
    choice = true
  }

  const { content } = props
  const fields = useSelector((state: ApplicationState) => state.schema.schema);
  const dispatch = useDispatch();
  const history = useHistory();
  const [options, setOptions] = React.useState<number>(0);
  const [indexComments, setIndexComments] = React.useState<number>(0);
  const [state, setState] = React.useState<CommentContent>({
    comment: "",
    loading: 0,
    detail: false,
    user: "",
    content: 0,
  });
  const [commentX, setCommentX] = React.useState<DestroyCommentDetail>({
    loading: 0,
    detail: false,
  });

  const handleClickOptions = (newNumber: number) => {
    if (newNumber === options) {
      setOptions(0);
    } else {
      setOptions(newNumber);
    }
  };

  const onClickLikes = (newValue: number) => {
    const data = {
      content: newValue,
      user: localStorage.getItem("token_id").split("$")[1],
      detail: true,
    };
    dispatch(requestLikesContent(data,choice));
  };

  const onSubmitComments = (e: FormProps) => {
    e.preventDefault();
    setState({
      ...state,
      loading: indexComments,
    });
    const patternsComments = `knd-comments-${indexComments}`
    setTimeout(() => {
      const comments = document.getElementById(patternsComments) as HTMLTextAreaElement;
      const data = {
        content: indexComments,
        user: localStorage.getItem("token_id").split("$")[1],
        comment: comments.value,
        detail: false,
        loading: state.loading,
      };
      dispatch(recordComment(data, setState,indexComments,choice));
    }, 500);
  };

  const handleClickGetIndex = (newValue: number) => {
    setIndexComments(newValue);
  };

  const onClickDestroyComments = (newV: number) => {
    setCommentX({
      ...commentX,
      loading: newV,
      detail: false,
    });
    setTimeout(() => {
      dispatch(destroyComment(newV, commentX, setCommentX));
    }, 500);
  };

  const handleClickMove = (newValue: number) => {
    dispatch(detailContent(newValue, content, history, fields));
  };

  const onClickShowDialogDestroy = (newValue: number) => {
    dispatch(contentOpenDialogDestroy(newValue,content))
    setOptions(0)
  }

  const onClickShowDialogRetrieve = (newValue: number) => {
    dispatch(contentOpenDialogRetrieve(newValue,content))
    setOptions(0)
  }

  const onClickProfile = (newValue: string) => {
    dispatch(detailAuth(newValue,history))
  }

  const onClickReport = (content: Content) => {
    setOptions(-1)
    dispatch(openDialogReport(content,false))
  }

  return (
    <section>
      {_.map(content, (base, index) => {
        const patternsComments = `knd-comments-${base.id}`
        return(
        <article key={index}>
          <div className="knd-home-card" id="knd-home-card-max-width">
            <div className="knd-home-card-header">
              <img src={base.author.avatar} alt="" className="knd-home-card-avatar"/>
              <a onClick={onClickProfile.bind(base,base.author.public_id)} className="knd-home-card-avatar-nickname">
                {base.author.user ? base.author.user.first_name : ""}
              </a>
              <div className="knd-push"></div>
              <button
                className="knd-home-card-btn-options"
                onClick={handleClickOptions.bind(base, base.id)}
              >
                {options === base.id ? (
                  <Grow in={options === base.id ? true : false}>
                    <i className="fas fa-times-circle"></i>
                  </Grow>
                ) : (
                  <Grow in={options !== base.id ? true : false}>
                    <i className="fas fa-ellipsis-v"></i>
                  </Grow>
                )}
              </button>
            </div>
            {options === base.id ? (
              <Grow
                in={options === base.id ? true : false}
                style={{ transformOrigin: "0 0 0" }}
                {...(Boolean(options) ? { timeout: 1000 } : {})}
              >
                <div className="knd-home-card-btn-group">
                  {is_active === base.author.id.toString() ? 
                  <button className="knd-home-card-btn" onClick={onClickShowDialogRetrieve.bind(base,base.id)}>
                    {fields.button ? fields.button.update : ""}
                  </button> : null }
                  {is_active === base.author.id.toString() ? 
                  <button className="knd-home-card-btn" onClick={onClickShowDialogDestroy.bind(base,base.id)}>
                    {fields.button ? fields.button.delete : ""}
                  </button> : null }
                  {is_active !== base.author.id.toString() ? 
                  <button className="knd-home-card-btn" onClick={onClickReport.bind(base,base)}>
                    {fields.button ? fields.button.report : ""}
                  </button> : null }
                </div>
              </Grow>
            ) : null}
            <div className="knd-home-card-content">
              <p>{base.description}</p>
            </div>
            <div className="knd-home-card-actions">
              <button onClick={onClickLikes.bind(base, base.id)}>
                {base.like_count}
                <span>{fields.button ? fields.button.like : ""}</span>
                <i className="fas fa-mitten"></i>
              </button>
              <button onClick={handleClickMove.bind(base, base.id)}>
                {base.comment_count}
                <span>{fields.button ? fields.button.comment : ""}</span>
                <i className="fas fa-comment-dots"></i>
              </button>
            </div>
            <div className="knd-home-card-footer">
              <span>
                <i className="fas fa-clock"></i>
                {moment(base.create_at).fromNow()}
              </span>
              <div className="knd-push"></div>
              <div className="knd-home-card-actions-face">
                {_.map(base.like, (baseLikes, indexLikes) => (
                  <div key={indexLikes}>
                    <img
                      src={baseLikes.author.avatar}
                      className="knd-home-card-actions-face-avatar"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            onSubmit={onSubmitComments}
            className="knd-home-card-form-comments"
          >
            <TextField
              type="text"
              multiline
              rows={2}
              placeholder={fields.button ? fields.button.text_comment : ""}
              label={fields.button ? fields.button.text_comment : ""}
              id={patternsComments}
              className="knd-comments-destroy"
              required
              onClick={handleClickGetIndex.bind(base, base.id)}
              fullWidth
            />
            <div>
              <button
                disabled={state.loading === base.id ? true : false}
                type="submit"
              >
                {fields.button ? fields.button.comment : ""}
              </button>
              {state.loading === base.id ? (
                <div className="knd-home-card-form-comments-loader">
                  <i className="fas fa-paper-plane"></i>
                </div>
              ) : null}
            </div>
          </form>
          {base.comment.length >= 1 ? (
            <div className="knd-home-card-comments">
              {_.map(base.comment, (baseComs, indexComs) => (
                <div className="knd-home-card-comment" key={indexComs}>
                  <div className="knd-home-card-comment-header">
                    <img
                      src={baseComs.author.avatar}
                      className="knd-home-card-comment-avatar"
                    />
                    <a onClick={onClickProfile.bind(baseComs,baseComs.author.public_id)} className="knd-home-card-comment-nickname">
                      {baseComs.author.user
                        ? baseComs.author.user.first_name
                        : ""}
                    </a>
                    <div className="knd-push"></div>
                    {commentX.loading !== baseComs.id ? (
                      is_active === baseComs.author.id.toString() ? 
                      <button
                        className="knd-home-card-comment-btn"
                        onClick={onClickDestroyComments.bind(
                          baseComs,
                          baseComs.id
                        )}
                      >
                        <i className="fas fa-trash"></i>
                      </button> : null 
                    ) : (
                      <div className="knd-home-card-comment-btn-loader">
                        <i className="fas fa-dot-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="knd-home-card-comment-content">
                    <p>{baseComs.comment}</p>
                    <span>{moment(baseComs.create_at).fromNow()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      )})}
    </section>
  );
};

export default KndCard;

