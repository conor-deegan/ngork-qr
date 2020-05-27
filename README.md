# ngrok-qr-tunnel

npm install ngrok-qr-tunnel

Create Script in package.json:
...
"start:dev": "tunnel <PORT> entryPoint"
...

e.g:
"start:dev": "tunnel 5000 server"

This package includes nodemon under the hood and will start an NGROK tunnel and QR code to easily access the tunnel on any mobile device.

