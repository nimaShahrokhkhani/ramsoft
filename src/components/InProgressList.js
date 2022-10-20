import React, {useEffect} from 'react'
import {useDrop} from 'react-dnd';
import {CardComponent} from './CardComponent';
import List from "@mui/material/List";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@mui/material/Divider";

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

export default function InProgressList({onInProgressDrop, inProgressList, onLearnMoreClick}) {
    const classes = useStyles();
    const [cardList, setCardList] = React.useState(inProgressList);
    useEffect(() => {
        setCardList(inProgressList);
    }, [inProgressList])
    const [{isOver}, dropRef] = useDrop({
        accept: 'card',
        drop: (item) => setCardList((basket) => {
            onInProgressDrop && onInProgressDrop(item);
            return (!basket.includes(item) && item.state === 'inProgress') ? [...basket, item] : basket
        }),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <div className={classes.container}>
            <div className={classes.listHeader}>{"In Progress List"}</div>
            <List className='basket' ref={dropRef} sx={{width: '100%', bgcolor: '#ffb74d', minHeight: '100vh', borderStyle: isOver ? 'dotted' : ''}}>
                {cardList.map(card => {
                    return (
                        <React.Fragment>
                            <CardComponent card={card} onLearnMoreClick={onLearnMoreClick}/>
                            <Divider variant="inset" component="li"/>
                        </React.Fragment>
                    )
                })}
            </List>
        </div>

    )
}
