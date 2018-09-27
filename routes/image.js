const multer = require("multer");
const path = require('path');
const fs = require("fs");
const sharp = require('sharp');
const upload = multer({
    dest: "./temp/images/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});
module.exports = (server) => {
    server.post("/upload", upload.single("file"), (req, res) => {
        console.log(req.file)
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../public/img/" + req.file.originalname);
        if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".jpeg") {
            sharp(tempPath)
                .resize(90)
                .toFile(targetPath, (err, info) => {
                    if (err) console.log(err);
                    fs.unlink(tempPath, err => {
                        if (err) console.log(err);
                        res
                            .status(200)
                            .contentType("text/plain")
                            .end("File uploaded!");
                    })
                })
            // fs.rename(tempPath, targetPath, err => {
            //     if (err) console.log(err);

            //     res
            //         .status(200)
            //         .contentType("text/plain")
            //         .end("File uploaded!");
            // });
        } else {
            fs.unlink(tempPath, err => {
                if (err) console.log(err);

                res
                    .status(403)
                    .contentType("text/plain")
                    .end("Only .png files are allowed!");
            });
        }
    })
    server.get("/upload", (req, res) => {
        res.render("pages/upload");
    });
}