import React from 'react'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  title: {},
}))

const CardRequest = (props) => {
  const classes = useStyles()

  const renderProduct = (product, index) => {
    return (
      <li key={index}>
        {product.qtd} {product.name} {product.item_selected}
      </li>
    )
  }

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" className={classes.margin}>
        <CardContent>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h5" component="h2">
                Status: {props.request.status}
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Nome: {props.request.name} <br />
                Mesa: {props.request.table} <br />
                Data: {props.request.start_date.format('DD/MM/YYYY HH:mm:ss')}
                <br />
                Tempo na cozinha:{' '}
                {props.request.diff_date.asMinutes().toFixed(0)} Minutos
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <ul>{props.request.products.map(renderProduct)}</ul>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={(e) => {
              props.action(props['data-key'])
            }}
            className={classes.margin}
          >
            {props['action-label']}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CardRequest
