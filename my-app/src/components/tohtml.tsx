



import escapeHtml from 'escape-html'
import { Text } from 'slate'

export const serialise = node => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text)
    if (node.bold) {
      string = `<strong>${string}</strong>`
    }
    else if (node.code) {
        string = `<code>${string}</code>`
      }
      else if (node.italic) {
        string = `<em>${string}</em>`
      }
    return string
  }

  const children = node.children.map(n => serialise(n)).join('')
  const style = `"text-align:${node.align}"`
   

  switch (node.type) {
    case 'block-quote':
        return (
         ` <blockquote >
         <p>
            ${children}
            </p>
          </blockquote>
          `
        )
        case 'image':
        return  (`<img width=100% src="${node.url}"></img>`)
        case 'video':
        return  (`<video width=100% src="${node.url}" controls></video>`)
      case 'bulleted-list':
        return (
            `
          <ul style=${style}>
            ${children}
          </ul>
          `
        )
      case 'heading-one':
        return (
            `
          <h1 style=${style}>
           ${children}
          </h1>
          `
        )
      case 'heading-two':
        return (
            `
          <h2 style=${style}>
            ${children}
          </h2>
          `
        )
      case 'list-item':
        return (
          `<li style=${style}>
            ${children}
          </li>`
        )
      case 'numbered-list':
        return (
          `<ol style=${style}>
            ${children}
          </ol>`
        )
      default:
        return (
          `<p style=${style}>
            ${children}
          </p>`
        )
  }
}