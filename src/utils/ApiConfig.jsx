import { BASEURL } from "./constants.jsx";

class ApiConfig {
  static users = BASEURL + "/users";
  static login = BASEURL + "/users/login/";
  static register = BASEURL + "/users/register/";
  static events = BASEURL + "/event/event";
  static feed = BASEURL + "/feed/feed";
  static feedAction = BASEURL + "/feed/feed-action";
  static feedActionDislike = BASEURL + "/feed/feed-action-dislike";
}

export default ApiConfig;
