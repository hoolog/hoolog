function initCodeCopyButton() {
  function copyTextContent(source) {
    let result = false;
    const target = document.createElement('pre');
    target.style.opacity = '0';
    target.textContent = source.textContent;
    document.body.appendChild(target);
    try {
      const range = document.createRange();
      range.selectNode(target);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      result = true;
    } catch (e) { console.log('copy failed.'); }
    document.body.removeChild(target);
    return result;
  };

  function initButton(pre) {
    const code = pre.querySelector('code');
    if (code) {
      const preParent = pre.parentElement;
      const newPreParent = document.createElement('div');
      newPreParent.style.position = 'relative';
      preParent.insertBefore(newPreParent, pre);
      const copyBtn = document.createElement('button');
      copyBtn.innerHTML = 'Copy';
      copyBtn.style.position = 'absolute';
      copyBtn.style.top = '0px';
      copyBtn.style.right = '17px';
      copyBtn.style.padding = '2.2px 8px';
      copyBtn.style.border = 'none';
      copyBtn.style.outline = 'none';
      copyBtn.style.backgroundColor = 'rgba(238, 238, 238, 0.8)';
      copyBtn.style.color = '#444';
      copyBtn.style.fontSize = '10px';
      copyBtn.style.cursor = 'pointer';
      copyBtn.style.transition = 'all 0.2s ease-in-out';
      copyBtn.addEventListener('click', () => {
        copyBtn.innerHTML = copyTextContent(code) ? 'Copied!' : 'Failed!';
        setTimeout(() => copyBtn.innerHTML = 'Copy', 1000);
      });
      newPreParent.appendChild(copyBtn);
      newPreParent.appendChild(pre);
    }
  };

  const pres = document.querySelectorAll('pre');
  if (pres.length !== 0) {
    pres.forEach(pre => initButton(pre));
  }
};

document.addEventListener('DOMContentLoaded', initCodeCopyButton);