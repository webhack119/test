window.onload = () => {
  const markdownContentDiv = document.getElementById('markdown-content');
  const params = new URLSearchParams(window.location.search);
  const mdFile = params.get('mdFile');

  if (!mdFile) {
    markdownContentDiv.innerHTML = '<p style="color: red;">Error: mdFile parameter missing.</p>';
    return;
  }

  fetch(mdFile)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(markdownText => {
      if (typeof marked === 'undefined') {
        markdownContentDiv.innerHTML = '<p style="color: red;">Error: marked.js library not loaded.</p>';
        return;
      }
      const htmlContent = marked.parse(markdownText);
      markdownContentDiv.innerHTML = htmlContent;
    })
    .catch(error => {
      console.error('Error fetching or parsing markdown file:', error);
      markdownContentDiv.innerHTML = `<p style="color: red;">Error: Could not fetch or parse Markdown file. ${error.message}</p>`;
    });
};
