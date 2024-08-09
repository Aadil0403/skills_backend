exports.htmlMail = (username) => {
  return `     <div
        class="container p-5"
        style="padding: 0px 0px; text-align: justify;line-height: 25px;"
      >
        <div style="font-weight:700;">
          <div style="font-weight:500;">Hey, ${username}</div>
          <div style="font-weight:400;">You have been registered with Skils++</div>
          <div style="font-weight:400;">Please tap on the below discord link to join the community and mentorship.</div>
          <a href="https://discord.com/invite/qyHgGnmb" target="_blank style="font-weight:400;">https://discord.com/invite/qyHgGnmb</a>
        </div>
      </div>`;
};
