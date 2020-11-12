import { Grow } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  contentDetailOpenDialogDestroy,
  contentDetailOpenDialogRetrieve,
  destroyComment,
  fetchDetailContent,
  recordComment,
  requestLikesContent,
} from "../../../actions/contentActions";
import { ApplicationState } from "../../../configureStore";
import moment from "moment";
import _ from "lodash";
import { TextField } from "@material-ui/core";
import {
  CommentContent,
  DestroyCommentDetail,
  FormProps,
} from "../../../constant/interface";
import { detailAuth } from "../../../actions/authActions";

const KndDetail = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state: ApplicationState) => state.schema.schema);
  const history = useHistory()
  const base = useSelector((state: ApplicationState) => state.content.detail);
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
  const location = useLocation();
  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(fetchDetailContent(location.search.split("?")[1] as any, history));
    }
    return () => {
      mounted = false;
    };
  }, []);

  const [options, setOptions] = React.useState<boolean>(false);

  const onClickLikes = (newValue: number) => {
    const data = {
      content: newValue,
      user: localStorage.getItem("token_id").split("$")[1],
      detail: true,
    };
    dispatch(requestLikesContent(data,false));
  };

  const handleClickOptions = (
    newValue: React.MouseEvent<HTMLButtonElement>
  ): void => {
    newValue.preventDefault();
    setOptions(!options);
  };

  const onSubmitComments = (e: FormProps) => {
    e.preventDefault();
    setState({
      ...state,
      loading: base.id,
    });
    setTimeout(() => {
      const comments = document.getElementById(`knd-comments-${base.id}`) as HTMLTextAreaElement;
      const data = {
        content: base.id,
        user: localStorage.getItem("token_id").split("$")[1],
        comment: comments.value,
        detail: true,
        loading: state.loading,
      };
      dispatch(recordComment(data, setState,base.id,false));
    }, 500);
  };

  const onClickDestroyComments = (newV: number) => {
    setCommentX({
      ...commentX,
      loading: newV,
      detail: true,
    });
    setTimeout(() => {
      const data = {
        loading: commentX.loading,
        detail: true,
      };
      dispatch(destroyComment(newV, data, setCommentX));
    }, 500);
  };

  const handleClickMove = (newValue: string) => {
    history.push(newValue)
  }

  const onClickDestroyContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(contentDetailOpenDialogDestroy(base))
    setOptions(false)
  }

  const onClickRetrieveContent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(contentDetailOpenDialogRetrieve(base))
    setOptions(false)
  }

  const onClickProfile = (newValue: string) => {
    dispatch(detailAuth(newValue,history))
  }

  let patterns = `knd-comments-${base.id ? base.id : 0}`

  return (
    <section>
      <header className="knd-home-card-header-page">
        <button onClick={handleClickMove.bind('','/')}>
          <i className="fas fa-arrow-left"></i>
          {fields.button ? fields.button.back : ""}
        </button>
      </header>
      {base.description ? (
        <div className="knd-home-card-width">
          <div className="row" id="knd-home-card-rows">
            <div className="col-xs">
              <article>
                <div className="knd-home-card">
                  <div className="knd-home-card-header">
                    <img
                      src={base.author.avatar}
                      alt=""
                      className="knd-home-card-avatar"
                    />
                    <a onClick={onClickProfile.bind(base, base.author.public_id)} className="knd-home-card-avatar-nickname">
                      {base.author.user ? base.author.user.first_name : ""}
                    </a>
                    <div className="knd-push"></div>
                    <button
                      className="knd-home-card-btn-options"
                      onClick={handleClickOptions}
                    >
                      {options ? (
                        <Grow in={options ? true : false}>
                          <i className="fas fa-times-circle"></i>
                        </Grow>
                      ) : (
                        <Grow in={!options ? true : false}>
                          <i className="fas fa-ellipsis-v"></i>
                        </Grow>
                      )}
                    </button>
                  </div>
                  {options ? (
                    <Grow
                      in={options ? true : false}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(Boolean(options) ? { timeout: 1000 } : {})}
                    >
                      <div className="knd-home-card-btn-group">
                      {localStorage.getItem('token_id_').split('$')[1] === base.author.id.toString() ? 
                        <button className="knd-home-card-btn" onClick={onClickRetrieveContent}>
                          {fields.button ? fields.button.update : ""}
                        </button> : null }
                      {localStorage.getItem('token_id_').split('$')[1] === base.author.id.toString() ? 
                        <button className="knd-home-card-btn" onClick={onClickDestroyContent}>
                          {fields.button ? fields.button.delete : ""}
                        </button> : null }
                        <button className="knd-home-card-btn">
                          {fields.button ? fields.button.report : ""}
                        </button> 
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
                    <button>
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
              </article>
            </div>
            <div className="col-xs">
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
                  id={patterns}
                  required
                  fullWidth
                />
                <div>
                  <button disabled={Boolean(state.loading)} type="submit">
                    {fields.button ? fields.button.comment : ""}
                  </button>
                  {state.loading ? (
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
                          localStorage.getItem('token_id_').split('$')[1] === baseComs.author.id.toString() ? 
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
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default KndDetail;
