export const USER_TOKEN = "@user-Token"
export const USER_KEY = "@user"

export const isAuthenticated = () => localStorage.getItem(USER_TOKEN) !== null

export const getToken = () => localStorage.getItem(USER_TOKEN)

export const currentUser = () => JSON.parse(localStorage.getItem(USER_KEY))

export const login = (token, user) => {
  localStorage.setItem(USER_TOKEN, token)
  localStorage.setItem(USER_KEY, user)
}

export const logout = () => {
  localStorage.removeItem(USER_TOKEN)
  localStorage.removeItem(USER_KEY)
}