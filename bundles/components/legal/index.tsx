import React from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../configureStore'
import _ from 'lodash'
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

const KndLegal: React.FunctionComponent = () => {
    const fields = useSelector((state: ApplicationState) => state.schema.schema)
    return (
        <section className="knd-legal-x">
            <div className="knd-legal">
                <div className="knd-legal-side-left">
                    <List component="nav" aria-label="secondary mailbox folders">
                        {_.map(fields.options ? fields.options.options : [], ((base, index) => (
                            <ListItemLink href="#simple-list" key={index}>
                                <ListItemText primary={base.name} />
                            </ListItemLink>
                        )))}
                    </List>
                </div>
                <div className="knd-legal-side-right">
                    mkdwqmkdwqLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


                </div>
            </div>
        </section>
    )
}

export default KndLegal