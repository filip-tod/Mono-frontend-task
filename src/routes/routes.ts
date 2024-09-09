const routes = {
  login: {
    path: "/login",
    name: "Login",
  },
  home: {
    path: "/home",
    name: "Home",
  },
  cars: {
    path: "/cars",
    name: "Car List",
  },
  newCar: {
    path: "/cars/new",
    name: "New Car",
  },
  editCar: {
    path: "/cars/edit/:id",
    name: "Edit Car",
  },
  makers: {
    path: "/cars/makers",
    name: "Makers",
  },
  profile: {
    path: "/profile",
    name: "Profile",
  },
  notFound: {
    path: "*",
    name: "Not Found",
  },
};

export default routes;
