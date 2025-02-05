const express = require("express");
const router = express.Router();
const SharePostModel = require("../model/sharePost.model");
router.get("/:id", async (req, res) => {
  const postId = req.params.id;
  const postDetails = await SharePostModel.getShareProduct(postId);

  const post = {
    id: postId,
    title: postDetails?.title,
    description: postDetails?.description,
    image: `http://178.128.197.35/${postDetails?.photo}`,
    url: `http://178.128.197.35/work/${postId}`,
  };

  res.send(`
 <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta property="og:title" content="${post.title}" />
        <meta property="og:description" content="${post.description}" />
        <meta property="og:image" content="${post.image}" />
        <meta property="og:url" content="${post.url}" />
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
