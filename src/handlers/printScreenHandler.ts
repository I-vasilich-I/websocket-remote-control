import Jimp from "jimp";
import { getMousePos, screen } from "robotjs";

const printScreenHandler = async () => {
  // messes colors up
  // try {
  //   const { x, y } = getMousePos();
  //   const { image, width, height } = screen.capture(x, y, 200, 200);
  //   const jimpInstance = new Jimp({
  //     data: image,
  //     width,
  //     height,
  //   });
  //   jimpInstance.quality(100);
  //   const data = await jimpInstance.getBase64Async(Jimp.MIME_PNG);
  //   return data.split(",")[1];
  // } catch (error) {
  //   console.error(error);
  // }

  // this one on the other hand works perfectly fine.
  // https://github.com/octalmage/robotjs/issues/13#issuecomment-501102240
  const { x, y } = getMousePos();
  const pic = screen.capture(x - 100, y - 100, 200, 200);
  const width = pic.byteWidth / pic.bytesPerPixel; // pic.width is sometimes wrong!
  const { height } = pic;
  const image = new Jimp(width, height);
  let red: number;
  let green: number;
  let blue: number;
  pic.image.forEach((byte: number, i: number) => {
    const mod = i % 4;
    if (mod === 0) {
      blue = byte;
      return;
    }

    if (mod === 1) {
      green = byte;
      return;
    }

    if (mod === 2) {
      red = byte;
      return;
    }

    image.bitmap.data[i - 3] = red;
    image.bitmap.data[i - 2] = green;
    image.bitmap.data[i - 1] = blue;
    image.bitmap.data[i] = 255;
  });

  const data = await image.getBase64Async(Jimp.MIME_PNG);
  return data.split(",")[1];
};

export default printScreenHandler;
