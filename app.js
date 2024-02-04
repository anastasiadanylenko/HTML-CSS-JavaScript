"use strict";

// https://api.github.com
//clientId - d9308aacf8b204d361fd
//secretId - 84969aeef73956f4ec9e8716d1840532802bb81b

const GITHUB_API_URL = "https://api.github.com";
const searchUser = document.querySelector(".searchUser");

class GitHubController {
  constructor(githubService, ui) {
    this.githubService = githubService;
    this.ui = ui;
  }

  async handleSearchInput(inputValue) {

    if (inputValue.trim() !== "") {
      const userData = await this.githubService.getUser(inputValue);

      if (userData.message) {
        this.ui.showAlert(userData.message, "alert alert-danger");
        return;
      }
       const userRepos = await this.githubService.getUsersRepositories(userData.repos_url);

     this.ui.showProfile(userData),
      this.ui.showRepos(userRepos)
    return;
    } 
    this.ui.clearProfile();
  }
}

class GitHubService {
  constructor(clientId, secretId) {
    this.clientId = clientId;
    this.secretId = secretId;
  }

  async getUser(userName) {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${userName}?client_id=${this.clientId}&client_secret=${this.secretId}`
    );

    const user = await response.json();

    return user;
  }

  async getUsersRepositories(reposUrl) {
    try{
      const response = await fetch(`${reposUrl}?sort=created&per_page=5`);


   const repositories = await response.json();
    
    return repositories;
  } catch(err) {
console.error('Error fetching repositories: ${err.message}');
  }
}}

class UI {
  constructor() {
    this.profile = document.querySelector(".profile");
    this.alertContainer = document.querySelector(".search");
    this.reposContainer = document.querySelector(".repos");
  }

  showRepos(repositories) {
    if (this.reposContainer) {
      if (repositories.length === 0){
      console.error("reposContainer not found.");
      return;
    }

    this.reposContainer.innerHTML = "";

    if (!repositories || repositories.length === 0) {
      this.reposContainer.innerHTML = "<p>No repositories found.</p>";
      return;
    }

    repositories.forEach(repo => {
      const repoElement = document.createElement("div");
      repoElement.innerHTML = `<p>${repo.name}</p>`;
      this.reposContainer.appendChild(repoElement);
    });
  }}

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div class="repos"></div>
    `;
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    div.className = className;
    div.innerHTML = message;

    this.alertContainer.before(div);

    this.clearAlert(div);
  }

  clearAlert(alert) {
    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

const ui = new UI();
const githubService = new GitHubService(
  "8ad51313c425dfc246635",
  "8db649ff883a65d85ef234594be41b69c22b6904"
);
const githubController = new GitHubController(githubService, ui);

let inputTimer;

searchUser.addEventListener("input", (e) => {
clearTimeout(inputTimer);
  const inputValue = e.target.value;
  inputTimer= setTimeout(async () => {
  await githubController.handleSearchInput(inputValue);
  }, 5000);
});


