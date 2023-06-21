// Set popup size by 2.5 / of the screen
$('body').css('width', `${screen.width/2.5}px`);

document.getElementById('setProxy').addEventListener('click', () => {
  const config = {
    mode: "pac_script",
    pacScript: {
      data:
      `function FindProxyForURL(url, host) {
        if (host === 'www.google.com')
          return 'PROXY 34.73.175.255:5050';
        return 'DIRECT';
      }`,
    },
  };

  chrome.proxy.settings.set(
    {value: config, scope: "regular" },
    function () {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log("Success");
      }
    }
  );
})

document.getElementById('unsetProxy').addEventListener('click', () => {
  chrome.proxy.settings.set(
    { value: { mode: "direct" }, scope: "regular" },
    function () {}
  );
})