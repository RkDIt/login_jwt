const API_VERSION =  "/api/v1"


export const API = {
  AUTH: `${API_VERSION}/auth`,
  MOVIE: `${API_VERSION}/movie`,

  AUTH_REGISTER: "/register",
  AUTH_LOGIN: "/login",
  AUTH_USER: "/user",
  AUTH_ADMIN:"/admin",
  AUTH_ADMIN_INDI_USER: "/admin/user/:id",

  MOVIE_CARAUSEL: "/carousel",
  MOVIE_REC_MOVIES: "/recMovies",
  MOVIE_SELECTED: "/selectedMovie/:id",
  MOVIE_ADD: "/addMovie",
  MOVIE_ALL: "/allMovies",

  ORDERS: "/orders",
  USERS_ORDERS: "/userOrders",
};



