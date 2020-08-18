import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AlarmIcon from '@material-ui/icons/Alarm'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import firebase from '../../firebase'
import './style.css'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  headerTopLef: {
    backgroundImage: 'url(imagens/bgtop.jpeg)',
    width: '800px',
    height: '1100px',
    position: 'absolute',
    transform: 'rotate(45deg)',
    top: '-415px',
    left: '-864px',
    borderRadius: '15px',
    zIndex: 5,
  },
  headerTopRight: {
    backgroundImage: 'url(imagens/bgtop.jpeg)',
    width: '800px',
    height: '1100px',
    position: 'absolute',
    transform: 'rotate(135deg)',
    top: '-415px',
    right: '-864px',
    borderRadius: '15px',
  },
  header: {
    position: 'relative',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#212121',
    height: '150px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#E0E0E0',
    //fontSize: '1em',
  },
  paperResume: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#E0E0E0',
    //fontSize: '1em',
  },
  paper2: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: 'center',
    color: ' #E0E0E0',
    backgroundColor: '#212121',
    cursor: 'pointer',
    //fontSize: '1em',
  },
  relative: {
    position: 'relative',
  },
  logo: {
    height: '100%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  padding: {
    margin: theme.spacing(1),
  },
  buttonLogin: {
    margin: '1em',
  },
  content: {
    height: '100vh',
  },
  inputStyle: {
    width: '90%',
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  inline: {
    display: 'inline',
  },
}))

const Index = function (props) {
  const classes = useStyles()
  const [requests, setRequests] = useState([])

  const changeOrderDeliver = async (index) => {
    const requestId = requests[index].id

    await firebase.firestore().collection('request').doc(requestId).update({
      status: 'ENTREGUE',
    })

    loadRequests()
  }

  const loadRequests = () => {
    firebase
      .firestore()
      .collection('request')
      .get()
      .then((docs) => {
        let requests = []

        docs.forEach((doc) => {
          let request = doc.data()
          request.id = doc.id

          request.start_date = request.date
            ? moment(request.date.toDate())
            : moment(request.start_date.toDate())
          request.end_date = request.end_date
            ? moment(request.end_date.toDate())
            : null
          request.diff_date = moment.duration(
            request.end_date
              ? moment(request.end_date.toDate()).diff(
                  request.start_date.toDate(),
                )
              : moment(moment()).diff(request.start_date.toDate()),
          )

          if (request.status !== 'ENTREGUE') {
            console.log(request)
            requests.push(request)
          }
        })

        setRequests(requests)
      })
  }

  useEffect(() => {
    if (requests.length === 0) {
      loadRequests()
    }
  })

  const renderProduct = (product, index) => {
    return (
      <li key={index}>
        {product.qtd} {product.name} {product.item_selected}
      </li>
    )
  }

  const [valueNavigation, setValueNavigation] = useState('preparation')

  const handleChangeNavigation = (event, newValue) => {
    setValueNavigation(newValue)
    if (newValue !== 'requests') {
      props.history.push('/status')
    } else {
      props.history.push('/request')
    }
  }

  const renderRequest = (request, index) => {
    // request.status = 'FEITO'
    //const classNameCard =
    //  request.status === 'A FAZER'
    //    ? 'request_card pending'
    //    : request.status === 'FEITO'
    //    ? 'request_card done'
    //    : 'request_card making'

    return (
      <Grid item xs={12} md={6}>
        <Card variant="outlined" className={classes.margin}>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h5" component="h2">
                  Status: {request.status}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Nome: {request.name} <br />
                  Mesa: {request.table} <br />
                  Data: {request.start_date.format('DD/MM/YYYY HH:mm:ss')}
                  <br />
                  Tempo na cozinha: {request.diff_date
                    .asMinutes()
                    .toFixed(0)}{' '}
                  Minutos
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <ul>{request.products.map(renderProduct)}</ul>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            {request.status === 'PRONTO' && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={(e) => {
                  changeOrderDeliver(index)
                }}
                className={classes.margin}
              >
                Marcar como ENTREGUE
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    )
  }

  return (
    <>
      <Grid item xs={12} className={classes.relative}>
        <div className={classes.headerTopLef}></div>
        <Paper className={classes.header}>
          <img className={classes.logo} alt="complex" src="/imagens/logo.png" />
        </Paper>
        <div className={classes.headerTopRight}></div>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper} elevation={3}>
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} className={classes.margin}>
              <BottomNavigation
                value={valueNavigation}
                onChange={handleChangeNavigation}
              >
                <BottomNavigationAction
                  label="Fazer Pedido"
                  value="requests"
                  showLabel
                  icon={<AssignmentIcon />}
                />

                <BottomNavigationAction
                  label="Verificar Preparação"
                  value="preparation"
                  showLabel
                  icon={<AlarmIcon />}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="center">
            {requests.map(renderRequest)}
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

export default Index
