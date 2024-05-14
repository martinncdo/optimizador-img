
import fse from "fs-extra";
import imagemin from "imagemin";
import imageminJpegtran from "imagemin-jpegtran";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminGifsicle from "imagemin-gifsicle";
import sharp from "sharp";
import imageminWebp from "imagemin-webp";

let inputFolder = "src";
let outputFolder = "opt";
let targetWidth = 1920;

const processImg = async () => {
    try {
        const files = await fse.readdir(inputFolder);

        for (const file of files) {
            let inputPath = `${inputFolder}/${file}`,
            outputPath = `${outputFolder}/${file}`;
            
            await sharp(inputPath).resize(targetWidth).toFile(outputPath);
            
            if(inputPath === "src/rosa.jpg"){
                await imagemin([outputPath], {
                    destination: outputFolder,
                    plugins: [
                        imageminJpegtran({quality:80}),
                        imageminPngquant(),
                        imageminSvgo(),
                        imageminWebp({quality: 80}),
                        imageminGifsicle(),
                    ],
                });
    
                console.log("Ha terminado con éxito el proceso de optimización.")
            }
        }
    } catch (error) {
        console.error(error);
    }
};

processImg();