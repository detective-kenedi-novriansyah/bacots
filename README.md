# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className="knd-navbar-popper">
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <div className="knd-navbar-dropdown">
                                        {_.map(is_info.info,((base, index) => {
                                            const is_authenticate_likes = base.likes ? base.likes.author.public_id : ''
                                            const is_authenticate_comments = base.comments ? base.comments.author.public_id : ''
                                            return (
                                                base.likes ? (
                                                    <div className="knd-navbar-dropdown-x" key={index}>
                                                        <div className="knd-navbar-dropdown-x-header">
                                                            <img src={base.likes.author.avatar} alt="" className="knd-navbar-dropdown-x-avatar"/>
                                                            <a onClick={onClickMoveProfile.bind(base, is_authenticate_likes)} className="knd-navbar-dropdown-x-nickname">
                                                                {base.likes.author ? base.likes.author.user.first_name : ''}
                                                            </a>
                                                        </div>
                                                        <div className="knd-navbar-dropdown-x-content">
                                                            <p onClick={onClickDetailContent.bind(base, base.likes.bacot_default.public_id)}>{base.likes.info_likes}</p>
                                                        </div>
                                                        <div className="knd-navbar-dropdown-x-actions">
                                                            <p>{moment(base.likes.create_at).fromNow()}</p>
                                                            <div className="knd-push"></div>
                                                            <i className="fas fa-mitten"></i>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="knd-navbar-dropdown-x" key={index}>
                                                        <div className="knd-navbar-dropdown-x-header">
                                                            <img src={base.comments.author.avatar} alt="" className="knd-navbar-dropdown-x-avatar"/>
                                                            <a onClick={onClickMoveProfile.bind(base, is_authenticate_comments)} className="knd-navbar-dropdown-x-nickname">{base.comments.author ? base.comments.author.user.first_name : ''}</a>
                                                        </div>
                                                        <div className="knd-navbar-dropdown-x-content">
                                                            <p onClick={onClickDetailContent.bind(base, base.comments.bacot_default.public_id)}>{base.comments.comment}</p>
                                                        </div>
                                                        <div className="knd-navbar-dropdown-x-actions">
                                                            <p>{moment(base.comments.create_at).fromNow()}</p>
                                                            <div className="knd-push"></div>
                                                            <i className="fas fa-comment-dots"></i>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        }))}
                                    </div>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>