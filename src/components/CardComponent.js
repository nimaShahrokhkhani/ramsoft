import React from 'react'
import { useDrag } from 'react-dnd'
import {
    Typography,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Button
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import _ from 'underscore';

export const CardComponent = ({ card, onLearnMoreClick }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'card',
        item: card,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const {id, name, description, deadline, image} = card;
    return (
        <div className='card-component' ref={dragRef}>
            <Card sx={{ margin: 5 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={!_.isEmpty(image) ? URL.createObjectURL(image) : ''}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon color={'inherit'} />
                    </IconButton>
                    <Button onClick={() => onLearnMoreClick && onLearnMoreClick(card)} size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    )
}
