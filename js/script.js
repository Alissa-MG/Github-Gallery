// profile information
const overviewSection = document.querySelector(".overview");
const username = "Alissa-MG";


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
      <p><strong>Name:Alissa Garcia</strong> ${data.name}</p>
      <p><strong>Bio:I am a new mom looking to leave my full-time job for a skill that will alow me to spend more time with my twins. </strong> ${data.bio}</p>
      <p><strong>Location:South Texas</strong> ${data.location}</p>
      <p><strong>Number of public repos:23</strong> ${data.public_repos}</p>
    </div>`
    overview.append(newDiv);
};