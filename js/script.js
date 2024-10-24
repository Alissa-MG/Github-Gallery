// profile information
const overviewSection = document.querySelector(".overview");
const username = "Alissa-MG";
const repoList = document.querySelector(".repo-list");
const allRepoData = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const allReposContainer = document.querySelector(".repos");
const galleryButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUserInfo = async function () {
    const userInfo =await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
    console.log(data);
};

gitUserInfo();


const displayUserInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overviewSection.append(newDiv);
    userRepos();

};


const userRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    //console.log(repoData);
    repoInfo(repoData);

};



const repoInfo = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    // fetch languages
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    // make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
}
    displayRepoInfo(repoInfo, languages);
};
const displayRepoInfo = function (repoInfo, languages) {
    galleryButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    const div = document.createElement("h3");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
        //<p>Description:${repoInfo.description}</p>
        //<p>Default Branch: ${repoInfo.default_branch}</p>
        //<p>Language: ${languages.join(",")}</p>
        //<a class="visit" href="${repoInfo.html_url}" target="_blank" 
        //rel="noreferrer noopener">View Repo on Github!</a>`;
        repoData.append(div);
    };
  
galleryButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    galleryButton.classList.add("hide");
});