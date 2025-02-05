const express = require("express");
const router = express.Router();

router.get("/share/:id", (req, res) => {
  const post = {
    id: postId,
    title: "Raiffeisen Plus Digital Identity",
    description:
      "Raiffeisen Plus, the innovative digital banking platform by Raiffeisen Bank Kosovo",
    image:
      "http://178.128.197.35/uploads/portfolio/content/1736255100877-01.png",
  };

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta property="og:title" content="${post.title}" />
        <meta property="og:description" content="${post.description}" />
        <meta property="og:image" content="${post.image}" />
        <meta property="og:url" content="http://178.128.197.35/api/share" />
        <meta name="twitter:card" content="summary_large_image">
        <title>${post.title}</title>
    </head>
    <body>
        <h1>${post.title}</h1>
        <p>${post.description}</p>
        <img src="${post.image}" alt="${post.title}" width="500"/>
    </body>
    </html>
  `);
});

module.exports = router;
