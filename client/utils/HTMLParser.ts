export const parseForHTML = (text:string) => {
    const bq = /\> (.*$)/gim;
    const bold = /\*\*(.*)\*\*/gim;
    const italics = /\*(.*)\*/gim;
    const image = /!\[(.*?)\]\((.*?)\)/gim;
    const link = /\[(.*?)\]\((.*?)\)/gim;
    const lineBreak = /\n$/gim;
    const htmlText = text.trim().replace(bq, "<blockquote>$1</blockquote>")
    .replace(bold, "<b>$1</b>").replace(italics, '<i>$1</i>').replace(image, "<img alt='$1' src='$2' />")
    .replace(link, "<a target='_blank' rel='noreferrer' href='$2'>$1</a>").replace(lineBreak, '<br />');
    
    return htmlText.trim();
}