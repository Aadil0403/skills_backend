exports.htmlMail = (username) => {
  return `     <div
        class="container p-5"
        style="background-color:black;color: white;padding: 50px; text-align: justify;line-height: 25px;"
      >
        <span style="font-weight:700;">
          <span style="font-weight:500;">Hey, ${username}</span>
          <span style="font-weight:400;">You have been registered with Skils++</span>
          <span style="font-weight:400;">Please tap on the below discord link to join the community and mentorship.</span>
          <a href="https://discord.com/invite/qyHgGnmb" target="_blank style="font-weight:400;">https://discord.com/invite/qyHgGnmb</a>
        </span>
      </div>`;
};
