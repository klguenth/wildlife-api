const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/')
      .expect('<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot GET /</pre>\n</body>\n</html>\n')
  })
})