import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AssignmentIcon from '@material-ui/icons/Assignment'
import AlarmIcon from '@material-ui/icons/Alarm'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast'

import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import firebase from '../../firebase'
import './style.css'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid container>{children}</Grid>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
}

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
  cursor: {
    cursor: 'pointer',
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
  const [products, setProducts] = useState({
    breakfast: [],
    lunch: [],
  })

  const [request, setRequest] = useState({
    products: [],
    status: 'A FAZER', // PREPARANDO, FEITO, ENTREGUE
    date: '',
  })
  const [table, setTable] = useState('')
  const [name, setName] = useState('')

  const [total, setTotal] = useState(0)

  const [categorySelected, setCategorySelected] = useState('breakfast')

  const [valueNavigation, setValueNavigation] = useState('requests')

  const [error, setError] = useState('')

  const handleChangeNavigation = (event, newValue) => {
    setValueNavigation(newValue)
    if (newValue !== 'requests') {
      props.history.push('/status')
    } else {
      props.history.push('/request')
    }
  }

  const [valueTab, setValueTab] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    changeMenuRequest(newValue === 0 ? 'breakfast' : 'lunch')
    setValueTab(newValue)
  }

  const resetRequest = () => {
    setRequest({
      products: [],
      status: 'A FAZER', // PREPARANDO, FEITO, ENTREGUE
      date: '',
    })
    setTotal(0)
    setName('')
    setTable('')
  }

  const loadProducts = () => {
    firebase
      .firestore()
      .collection('menu')
      .orderBy('name', 'desc')
      .get()
      .then((docs) => {
        const products = {
          breakfast: [],
          lunch: [],
        }

        docs.forEach((doc) => {
          const productFirebase = doc.data()
          if (productFirebase.category === 'breackfast') {
            products.breakfast.push({
              name: productFirebase.name,
              price: parseFloat(productFirebase.price),
              type_itens: productFirebase.type_itens
                ? productFirebase.type_itens
                : [],
            })
          } else {
            products.lunch.push({
              name: productFirebase.name,
              price: parseFloat(productFirebase.price),
              type_itens: productFirebase.type_itens
                ? productFirebase.type_itens
                : [],
            })
          }
        })

        setProducts(products)
      })
  }

  useEffect(() => {
    if (products.breakfast.length === 0) {
      loadProducts()
    }
  })

  const selectProduct = (index) => {
    let totalPrice = 0
    const product = products[categorySelected][index]

    request.products.push({
      name: product.name,
      price: product.price,
      qtd: 1,
      productIndex: index,
      categorySelected,
    })

    totalPrice = total + product.price

    setRequest(request)
    setTotal(totalPrice)
    setError('')
  }

  const renderProduct = (product, index) => {
    return (
      <>
        <Grid item xs={12} md={6} onClick={() => selectProduct(index)}>
          <Paper className={classes.paper2} elevation={3}>
            {product.name}
            <br />
            R$ {product.price.toFixed(2)}
          </Paper>
        </Grid>
      </>
    )
  }

  const removeProductRequest = (index) => {
    request.products[index].qtd--
    if (request.products[index].qtd === 0) {
      request.products.splice(index, 1)
    }

    let total = 0
    request.products.forEach((currentValue) => {
      total += currentValue.price * currentValue.qtd
    })

    setRequest(request)
    setTotal(total)
    setError('')
  }

  const changeSelectItemProduct = (e, indexRequest) => {
    request.products[indexRequest].indexSelected = e.target.value
    console.log(request)
    setRequest(request)
  }

  const renderTypeItens = (product, indexRequest) => {
    const requestProduct = request.products[indexRequest]
    return (
      <>
        <select onChange={(e) => changeSelectItemProduct(e, indexRequest)}>
          {product.type_itens.map((item, indexItem) => {
            if (requestProduct.indexSelected === indexItem) {
              return (
                <option value={indexItem} selected>
                  {item}
                </option>
              )
            }
            return <option value={indexItem}>{item}</option>
          })}
        </select>
      </>
    )
  }

  const renderRequest = (productRequest, index) => {
    const product =
      products[productRequest.categorySelected][productRequest.productIndex]
    return (
      <ListItem>
        <span>{product.name} </span>

        <span>
          &nbsp;
          {product.type_itens.length
            ? renderTypeItens(product, index)
            : ''}{' '}
        </span>

        <span>&nbsp; R$ {product.price.toFixed(2)}</span>

        <span
          className={classes.cursor}
          onClick={() => removeProductRequest(index)}
        >
          {' '}
          <DeleteForeverIcon />
        </span>
      </ListItem>
    )
  }

  const changeMenuRequest = (value) => {
    setCategorySelected(value.toLowerCase())
    setError('')
  }

  const changeTable = (event) => {
    setTable(event.target.value)
    setError('')
  }

  const changeName = (event) => {
    setName(event.target.value)
    setError('')
  }

  const requestFinished = async () => {
    let error = ''

    if (!name) {
      error = 'Informe o nome do cliente'
    } else if (!table) {
      error = 'Informe o numero da mesa'
    } else if (request.products.length === 0) {
      error = 'Selecione um produto para montar o pedido'
    }

    if (error) {
      setError(error)
      return false
    } else {
      setError(error)
    }

    request.start_date = new Date()
    request.products = request.products.map((productRequest) => {
      const product =
        products[productRequest.categorySelected][productRequest.productIndex]
      return {
        ...productRequest,
        item_selected: product.type_itens.length
          ? product.type_itens[
              productRequest.indexSelected === undefined
                ? 0
                : productRequest.indexSelected
            ]
          : '',
      }
    })
    request.end_date = null
    request.table = table
    request.total = total
    request.name = name

    const result = await firebase.firestore().collection('request').add(request)
    if (result.id) {
      props.history.push('/status')
    } else {
      setError('Nao foi possivel registrar o pedido')
    }
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

            <Grid container alignItems="baseline" justify="center">
              <Grid item xs={6}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={valueTab}
                    onChange={handleChangeTab}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                  >
                    <Tab
                      label="Café da Manhâ"
                      icon={<FreeBreakfastIcon />}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Almoço / Jantar"
                      icon={<RestaurantIcon />}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={valueTab} index={0}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      mane="name"
                      label="Nome"
                      required
                      className={classes.inputStyle}
                      placeholder="Digite nome do cliente"
                      onChange={changeName}
                      variant="outlined"
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      mane="table"
                      label="Mesa"
                      required
                      className={classes.inputStyle}
                      placeholder="Digite numero da mesa"
                      onChange={changeTable}
                      variant="outlined"
                      value={table}
                    />
                  </Grid>
                  <Grid container alignItems="center" justify="center">
                    {products['breakfast'].map(renderProduct)}
                  </Grid>
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      mane="name"
                      label="Nome"
                      required
                      className={classes.inputStyle}
                      placeholder="Digite nome do cliente"
                      onChange={changeName}
                      variant="outlined"
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      mane="table"
                      label="Mesa"
                      required
                      className={classes.inputStyle}
                      placeholder="Digite numero da mesa"
                      onChange={changeTable}
                      variant="outlined"
                      value={table}
                    />
                  </Grid>
                  <Grid container alignItems="center" justify="center">
                    {products['lunch'].map(renderProduct)}
                  </Grid>
                </TabPanel>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12}>
                    <Paper className={classes.paperResume}>
                      <Typography variant="h5" gutterBottom>
                        Resumo do Pedido
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {name && <span> Nome: {name}</span>}{' '}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {table && <span> Mesa: {table}</span>}{' '}
                      </Typography>

                      <List>{request.products.map(renderRequest)}</List>

                      <div className="total">Total: R$ {total.toFixed(2)}</div>
                    </Paper>

                    {error && <p>{error}</p>}
                  </Grid>
                  <Grid item xs={12} className={classes.margin}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.margin}
                      onClick={resetRequest}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={requestFinished}
                      className={classes.margin}
                    >
                      Registrar
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

export default Index
