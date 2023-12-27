import { BASEURL } from "./constants.jsx";

class ApiConfig {
  static users = BASEURL + "/users/users";
  static login = BASEURL + "/users/login/";
  static register = BASEURL + "/users/register/";
  static events = BASEURL + "/event/event";
  static feed = BASEURL + "/feed/feed";
  static recommendFeed = BASEURL + "/feed/recommend-feed";
  static feedAction = BASEURL + "/feed/feed-action";
  static feedActionDislike = BASEURL + "/feed/feed-action-dislike";
  static feedActionComment = BASEURL + "/feed/feed-action-comment";
  static connections = BASEURL + "/connection/connection";
  static recommendedConnection = BASEURL + "/connection/recommend-connection";
  static analytics = BASEURL + "/analytics/analytics";
  static profileAnalytics = BASEURL + "/analytics/analytics-count/";
  static skills = BASEURL + "/skill/skill";
  static userSkills = BASEURL + "/skill/user-skill";
  static userSkillsByUser = BASEURL + "/skill/user-skill-by-user";
  static userActivity = BASEURL + "/feed/user-activity";
  static experience = BASEURL + "/experience/experience";
  static userExperience = BASEURL + "/experience/user-experience";
  static connection = BASEURL + "/connection/connection";
  static connectionRequest = BASEURL + "/connection/connection-request/";
  static connectionRequestAccept = this.connection + "-request-accept/";
  static notification = BASEURL + "/notification/notification/";
  static notificationRead = BASEURL + "/notification/read/";
  static checkEmail = BASEURL + "/users/check-email/";
  static getPost = BASEURL + "/feed/feed/";
  static opportunities = BASEURL + "/opportunity/opportunity/";
  static opportunityAppication =
    BASEURL + "/opportunity/opportunity-application/";
  static recommendOpportunities =
    BASEURL + "/opportunity/recommend-opportunity/";
  static cities = BASEURL + "/csc/city/";
  static clubs = BASEURL + "/club/club/";
}

export default ApiConfig;
