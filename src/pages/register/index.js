import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'

import firebase from '../../firebase'

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
  buttonLogin: {
    margin: '1em',
  },
  content: {
    height: '100vh',
  },
  marginField: {
    margin: '1em',
  },
  marginLeftRight: {
    margin: '0 1em 0 1em',
  },
  inputStyle: {
    width: '50%',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}))

const Index = function (props) {
  const classes = useStyles()

  const [values, setValues] = useState({
    name: '',
    nickName: '',
    email: '',
    password: '',
    sector: '',
    showPassword: false,
  })
  const [error, setError] = useState()

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const clickBack = () => {
    props.history.push('/')
  }

  const clickRegister = async (e) => {
    e.preventDefault()
    const { email, password, sector, nickName, name } = values

    console.log(values)
    if (!email || !password || !sector) {
      setError('O email, senha e setor é de preenchimento obrigatório!')
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (data) => {
          const user = {
            name,
            nickName,
            email: email,
            sector: sector,
            user_uid: firebase.auth().currentUser.uid,
          }

          await firebase.firestore().collection('users').add(user)

          props.history.push('/')
        })
        .catch((error) => {
          setError('Usuário já existente!')
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
          <form className={classes.root} autoComplete="off">
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} className={classes.marginField}>
                <TextField
                  id="name"
                  label="Nome"
                  required
                  type="text"
                  variant="outlined"
                  placeholder="Digite seu nome"
                  className={classes.inputStyle}
                  onChange={handleChange('name')}
                />
              </Grid>

              <Grid item xs={12} className={classes.marginField}>
                <TextField
                  id="nickName"
                  label="Apelido"
                  required
                  type="text"
                  placeholder="Digite seu apelido"
                  className={classes.inputStyle}
                  onChange={handleChange('nickName')}
                  variant="outlined"
                />
              </Grid>

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

              <Grid item xs={12} className={classes.marginLeftRight}>
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

              <Grid item xs={12} className={classes.marginField}>
                <FormControl
                  component="fieldset"
                  className={classes.inputStyle}
                >
                  <FormLabel component="legend">Tipo de usuário</FormLabel>
                  <RadioGroup
                    row
                    aria-label="sector"
                    name="sector"
                    defaultValue="start"
                  >
                    <FormControlLabel
                      value="cozinha"
                      control={<Radio color="primary" />}
                      label="Cozinha"
                      labelPlacement="start"
                      onChange={handleChange('sector')}
                    />

                    <FormControlLabel
                      value="atendente"
                      control={<Radio color="primary" />}
                      label="Atendente"
                      labelPlacement="start"
                      onChange={handleChange('sector')}
                    />

                    <FormControlLabel
                      value="adm"
                      control={<Radio color="primary" />}
                      label="Adm"
                      labelPlacement="start"
                      onChange={handleChange('sector')}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                {error && <p>{error}</p>}
              </Grid>

              <Grid item xs={12}>
                {' '}
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.buttonLogin}
                  onClick={clickBack}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.buttonLogin}
                  onClick={clickRegister}
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </>
  )
}

export default Index
