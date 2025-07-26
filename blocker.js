BLOCKED_SITE_HTML = `
<!DOCTYPE html>
<html>
  <head>
    <title>Blocked Site</title>
    <style>
    * {
      all: revert;
    }
      html {
        background-color: hsl(0 0% 0);
        color: hsl(0 0% 100%);
      }
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      h1 {
        font-size: 3rem;
        color: hsl(0 100% 50%);
      }
    </style>
  </head>
  <body>
    <h1>That site is blocked</h1>
    <p>You are not allowed to visit that site.</p>
  </body>
</html>
`

BLOCKED_YOUTUBE_VIDEO_HTML = `
<h1 style="
  all: revert;
  font-size: 4rem;
">You are not allowed to watch this video!</h1>
<label style="
  all: revert;
  font-size: 2rem;
">
  Input your parent control password: 
  <input style="
    all: revert;
  ">
</label>
<button style="
  all: revert;
">Submit</button>
<button style="
  all: revert;
" onclick="
(() => {document.body.removeChild(document.getElementById('parent-filter-extension--blocked-youtube-video'))})()
 ">Close</button>
`



const whitelist = [
  'example.com',
  'pbskids.org',
  'www.google.com',
  'www.youtube.com'
]

const youtubeWhitelist = [
  'ccEpTTZW34g'
]

if (!whitelist.includes(window.location.hostname)) {
  window.location.href = 'https://example.com/'
} else if (window.location.href === 'https://example.com/') {
  document.documentElement.style.display = 'none'
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('style').forEach(el => el.remove());
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.disabled = true)
    document.documentElement.style.display = 'block'
    document.documentElement.innerHTML = BLOCKED_SITE_HTML
  })
}

document.addEventListener("click", e => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || window.location.hostname !== 'www.youtube.com') return
  const link = e.target.closest("a")
  if (!link) return
  const v = new URLSearchParams(link.search).get("v")
  if (!v || youtubeWhitelist.includes(v)) return

  e.preventDefault()
  e.stopImmediatePropagation()

  const element = document.createElement('div')
  element.id = 'parent-filter-extension--blocked-youtube-video'
  element.style.all = 'revert'
  element.style.position = 'fixed'
  element.style.top = '50%'
  element.style.left = '50%'
  element.style.backgroundColor = 'red'
  element.style.transform = 'translate(-50%, -50%)'
  element.style.padding = '12px'
  element.innerHTML = BLOCKED_YOUTUBE_VIDEO_HTML
  document.body.appendChild(element)
  console.log(`Navigation intercepted: ${link.href}`)
}, true);


/*

todo: make them shadow doms
*/