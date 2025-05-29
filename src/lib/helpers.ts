import removeMarkdown from 'remove-markdown';

export function copyText(text: string) {
  navigator.clipboard.writeText(removeMarkdown(text))
}