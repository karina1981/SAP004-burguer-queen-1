import React from 'react'
import './style.css'
import Routes from './routes'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '1048px',
    margin: '0 auto',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Routes />
      </Grid>
    </div>
  )
}

export default App
