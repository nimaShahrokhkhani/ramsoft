import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {CardComponent} from './CardComponent';
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {Button, ListSubheader} from "@mui/material";

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    listHeader: {
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    }
}));

export default function TodoList({todoList, onAddTaskClick, onLearnMoreClick}) {
    const classes = useStyles();
    const [cardList, setCardList] = React.useState(todoList);

    useEffect(() => {
        setCardList(todoList);
    }, [todoList])
    return (
        <div className={classes.container}>
            <div className={classes.listHeader}>{"Todo List"}</div>
            <List sx={{width: '100%', bgcolor: '#ffe0b2', minHeight: '100vh'}}>
                <ListSubheader>
                    <Button style={{color: '#b71c1c'}} onClick={onAddTaskClick}>Add new task...</Button>
                </ListSubheader>
                {cardList.map(card => {
                    return (
                        <React.Fragment>
                            <CardComponent draggable card={card} onLearnMoreClick={onLearnMoreClick}/>
                            <Divider variant="inset" component="li"/>
                        </React.Fragment>
                    )
                })}
            </List>
        </div>
    );
}

