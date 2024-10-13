// profile information
const overviewSection = document.querySelector(".overview");
const username = "Alissa-MG";


const gitUserInfo = async function () {
    const userInfo =await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data);
    console.log(date);
};

gitUserInfo();

const displayUserInfo = function (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${} />
        </figure>
    <div>
      <p><strong>Name:</strong> ${}</p>
      <p><strong>Bio:</strong> ${}</p>
      <p><strong>Location:</strong> ${}</p>
      <p><strong>Number of public repos:</strong> ${}</p>
    </div>`;
}