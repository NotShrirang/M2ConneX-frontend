import { BASEURL } from "./constants.jsx";

class ApiConfig {
  static users = BASEURL + "/users";
  static login = BASEURL + "/users/login/";
  static register = BASEURL + "/users/register/";
}

export default ApiConfig;
