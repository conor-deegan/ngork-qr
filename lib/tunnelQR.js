const ngrok = require("ngrok");
const qrcode = require("qrcode-terminal");
const chalk = require("chalk");
const colors = require("colors");
const nodemon = require("nodemon");

var tunnelQR = async (port, main) => {
  if (!port) {
    console.error(colors.bgRed('PORT must be defined as a second argument'));
    return
  };
  if (!main) {
    console.error(colors.bgRed('Main entry file must be defined as a third argument'));
    return
  };
  nodemon({
    script: `${main}.js`,
    ext: 'js json'
  })
  const options = {
    port: port,
    host_header: `localhost:${port}`
  };
  let url = null
  nodemon.on('start', async () => {
    try {
      if (!url) {
        url = await ngrok.connect(options);
        const code = await new Promise(resolve =>
          qrcode.generate(url, {
            small: true
          }, qr => resolve(qr))
        );
        const qr = [
          `---------------------------`,
          `> ngrok http ${options.port}`,
          `---------------------------`,
          chalk.underline.cyan(url),
          `---------------------------`,
          code
        ].join("\r\n");
        console.log(qr);
      }
    } catch (error) {
      console.log(error);
    };
  }).on('quit', async () => {
    await ngrok.kill()
  });
};

exports.tunnelQR = tunnelQR;