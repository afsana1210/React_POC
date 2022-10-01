function createMarkup() {
    return { __html: 'First &middot; Second' }
  }
  
  function NewinnerHTMLSyntac() {
    return <div dangerouslySetInnerHTML={createMarkup()} />
  }

  export default NewinnerHTMLSyntac;