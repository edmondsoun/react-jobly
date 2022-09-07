import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all companies */
  static async getAllCompanies() {
    let res = await this.request(`companies/`);
    return res.companies;
  }

  /** Search for a company*/
  static async getCompaniesByQuery(name) {
    let res = await this.request(`companies?name=${name}`);
    return res.companies;
  }

  /** Get list of all jobs */
  static async getAllJobs() {
    let res = await this.request(`jobs/`);
    return res.jobs;
  }

  /** Search for a jobs*/
  static async getJobsByQuery(title) {
    let res = await this.request(`jobs?title=${title}`);
    return res.jobs;
  }

  /**Log in to site */
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /**Sign up */
  static async register(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  //TODO: look into token
  /**Update user profile */
  static async updateProfile(data) {
    let res = await this.request(`users/${data.username}`, data, "patch");
    return res.user;
  }

}


export default JoblyApi;