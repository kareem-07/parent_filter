document.documentElement.style.display = 'none'
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('style').forEach(el => el.remove());
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.disabled = true)
  document.documentElement.style.display = 'block'
  document.body.innerHTML = `You cannot access ${window.location.href}`
})