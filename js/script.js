// profile information
const overviewSection = document.querySelector(".overview");
const username = "Alissa-MG";
const repoList = document.querySelector(".repo-list");
const allRepoData = document.querySelector(".repos");
const singleRepoData = document.querySelector(".repo-data");


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

}