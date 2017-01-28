const http = require('http')
const xml2js = require('xml2js')
const parser = xml2js.Parser({ explicitArray: false })

function goodreadsService() {
  function getBookById(id, callback) {
    const options = {
      host: 'www.goodreads.com',
      path: `/book/show/${ id }?format=xml&key=DyqnwT0F6f8jVIJc3VsBA`
    }
    http.request(options, (response) => {
      let str = ''
      response.on('data', (chunk) => str += chunk)
      response.on('end', () => {
        parser.parseString(str, (err, result) => {
          console.log(result.GoodreadsResponse.book)
          callback(null, result.GoodreadsResponse.book)
        })
      })
    }).end()
  }

  return {
    getBookById
  }
}

module.exports = goodreadsService
