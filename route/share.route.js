const express = require("express");
const router = express.Router();
const SharePostModel = require("../model/sharePost.model");
const multer = require("multer");
const nodemailer = require("nodemailer");
const upload = multer({ dest: "uploads/cv" });

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
        <meta property="og:title" content="${post.description}" />
        <meta property="og:description" content="${post.title}" />
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
router.post("/send-email", upload.single("file"), async (req, res) => {
  const { name, surname, email, phone, coverLetter } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jobs@koperativa.com",
        pass: "tgwr ewhr xvkr mymp",
      },
    });

    // Email options
    let mailOptions = {
      from: "jobs@koperativa.com",
      to: "jobs@koperativa.com",
      subject: "CV Submission",
      text: `
      Name: ${name}
      Surname: ${surname}
      Email: ${email}
      Phone: ${phone}

      Cover Letter:
      ${coverLetter}"`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Email sending failed" });
  }
});

module.exports = router;
