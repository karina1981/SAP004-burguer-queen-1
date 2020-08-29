import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import firebase from '../../firebase'
import { login } from '../../services/auth'

import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

// import BottomNavigation from '@material-ui/core/BottomNavigation'
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
// import FolderIcon from '@material-ui/icons/Folder'
// import RestoreIcon from '@material-ui/icons/Restore'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import LocationOnIcon from '@material-ui/icons/LocationOn'

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
  relative: {
    position: 'relative',
  },
  logo: {
    height: '100%',
  },
  marginField: {
    margin: '1em',
  },
  buttonLogin: {
    margin: '1em',
  },
  content: {
    height: '100vh',
  },
  inputStyle: {
    width: '80%',
  },
}))

const Index = function (props) {
  const classes = useStyles()
  const [error, setError] = useState('')

  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // const [value, setValue] = React.useState('recents')

  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // }

  const clickRegister = () => {
    props.history.push('/register')
  }

  const submitLogin = (e) => {
    e.preventDefault()
    const { email, password } = values

    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!')
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const resultToken = await result.user.getIdTokenResult()

          firebase
            .firestore()
            .collection('users')
            .where('user_uid', '==', result.user.uid)
            .get()
            .then((docs) => {
              docs.forEach((doc) => {
                const currentUser = doc.data()

                login(resultToken.token, JSON.stringify(currentUser))

                if (currentUser.sector === 'atendente') {
                  props.history.push('/request')
                } else if (currentUser.sector === 'adm') {
                  props.history.push('/admin')
                } else {
                  props.history.push('/kitchen')
                }
              })
            })
        })
        .catch((error) => {
          setError('E-mail ou senha inválidos!')
        })
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
            <Grid item={true} xs={12} sm={6}>
              Bem vindo CK Lover! <br />
              Entre com seu email e senha <br /> ou <br />
              Registre um novo usuário! <br />
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className={classes.buttonLogin}
                onClick={clickRegister}
                to="/register"
              >
                Registrar
              </Button>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
              <form className={classes.root} autoComplete="off">
                <Grid container>
                  <Grid item xs={12} className={classes.marginField}>
                    <TextField
                      id="email"
                      label="Email"
                      required
                      type="email"
                      placeholder="Digite seu email"
                      className={classes.inputStyle}
                      onChange={handleChange('email')}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} className={classes.marginField}>
                    <FormControl className={classes.inputStyle}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        id="password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        variant="outlined"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="div_error">{error && <p>{error}</p>}</div>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className={classes.buttonLogin}
                      onClick={submitLogin}
                    >
                      Entrar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}

export default Index
