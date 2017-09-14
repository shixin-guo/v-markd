import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import './../assets/atom-one-light.css';

hljs.initHighlightingOnLoad();

const md = new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'language-',
    linkify: false,
    typographer: false,
    quotes: '',
    highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${
                    hljs.highlight(lang, str, true).value
                }</code></pre>`;
            } catch (e) {
                console.log(e);
            }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
});
export default md;
