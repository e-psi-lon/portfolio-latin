import React from 'react';
import MarkdownIt from 'markdown-it';
import parse from 'html-react-parser';

const md = new MarkdownIt().disable(['heading', 'list', 'code']);
md.inline.ruler.before('emphasis', 'strikethrough', (state, _) => {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) === 0x7E && state.src.charCodeAt(pos + 1) === 0x7E) {
        const start = pos;
        const marker = state.src.slice(start, start + 2);

        const end = state.src.indexOf(marker, start + 2);
        if (end !== -1) {
        const content = state.src.slice(start + 2, end);
        state.push('s_open', 's', 1).attrSet('class', 'strikethrough');
        state.push('text', '', 0).content = content;
        state.push('s_close', 's', -1);
        state.pos = end + 2;
        return true;
        }
    }
    return false;
});

md.inline.ruler.before('emphasis', 'underline', (state, _) => {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) === 0x2D && state.src.charCodeAt(pos + 1) === 0x2D) {
        const start = pos;
        const marker = state.src.slice(start, start + 2);
        const end = state.src.indexOf(marker, start + 2);
        if (end !== -1) {
        const content = state.src.slice(start + 2, end);
        state.push('u_open', 'u', 1);
        state.push('text', '', 0).content = content;
        state.push('u_close', 'u', -1);
        state.pos = end + 2;
        return true;
        }
    }
    return false;
});

md.inline.ruler.before('emphasis', 'superscript', (state, _) => {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) === 0x2B && state.src.charCodeAt(pos + 1) !== 0x20 && state.src.charCodeAt(pos + 1) !== 0x0A && state.src.charCodeAt(pos + 1) !== 0x2B && (state.src.charCodeAt(pos - 1) === 0x20 || state.src.charCodeAt(pos - 1) === 0x0A || state.src.charCodeAt(pos - 1) === 0x2D || state.src.charCodeAt(pos - 1) === 0x2A || state.src.charCodeAt(pos - 1) === 0x5F || state.src.charCodeAt(pos - 1) === 0x7E) || pos === 0) {
        const start = pos;
        const marker = state.src.slice(start, start + 1);

        const end = state.src.indexOf(marker, start + 1);
        if (end !== -1) {
        const content = state.src.slice(start + 1, end);
        state.push('sup_open', 'sup', 1);
        state.push('text', '', 0).content = content;
        state.push('sup_close', 'sup', -1);
        state.pos = end + 1;
        return true;
        }
    }
    return false;
});

md.inline.ruler.before('emphasis', 'subscript', (state, _) => {
    let pos = state.pos;
    if (state.src.charCodeAt(pos) === 0x2D && state.src.charCodeAt(pos + 1) !== 0x20 && state.src.charCodeAt(pos + 1) !== 0x0A && state.src.charCodeAt(pos + 1) !== 0x2D && (state.src.charCodeAt(pos - 1) === 0x20 || state.src.charCodeAt(pos - 1) === 0x0A || state.src.charCodeAt(pos - 1) === 0x2B || state.src.charCodeAt(pos - 1) === 0x2A || state.src.charCodeAt(pos - 1) === 0x5F || state.src.charCodeAt(pos - 1) === 0x7E) || pos === 0) {
      const start = pos;
      const marker = state.src.slice(start, start + 1);
  
      const end = state.src.indexOf(marker, start + 1);
      if (end !== -1) {
        const content = state.src.slice(start + 1, end);
        state.push('sub_open', 'sub', 1);
        state.push('text', '', 0).content = content;
        state.push('sub_close', 'sub', -1);
        state.pos = end + 1;
        return true;
      }
    }
    return false;
});
const MarkdownRenderer = ({ toRender }) => {
    if (toRender === "") {
        return null;
    }
    let html = md.render(toRender);
    html = html.replace("<p>", "<span>");
    html = html.replace("</p>", "</span>");
    const transformedHtml = parse(html);
    return (
        <>
            {transformedHtml}
        </>
    )
}


export default MarkdownRenderer;
