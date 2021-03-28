import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { showLastDigits } from '../../lib/utils';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardItem = ({ dataCard }) => {
  const classes = useStyles();

  console.log('dataCard', dataCard)

  const content = dataCard?.map(card => {
    const {id, fullName, cardNumber, expiryDate, cardBrand } = card

    return (
      <Card key={id} className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fullName}
            </Typography>
            <div className="card-item-wrapper">
              <Typography variant="body2" color="textSecondary" component="p">
                {showLastDigits(cardNumber)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {expiryDate}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            {cardBrand}
          </CardActions>
        </CardActionArea>
      </Card>
    )
  })
  

  return content
}
 
export default CardItem;