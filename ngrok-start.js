const ngrok = require('ngrok');

(async function() {
  try {
    const url = await ngrok.connect(3000); // 3000-es portot kapcsolunk össze
    console.log('Ngrok tunnel opened at:', url);
  } catch (err) {
    console.error('Error starting ngrok:', err);
  }
})();
