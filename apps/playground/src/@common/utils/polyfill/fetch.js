if (!globalThis.fetch) {
  await import('node-fetch').then(({ default: fetch, Headers, Request, Response }) => {
    globalThis.fetch = fetch
    globalThis.Headers = Headers
    globalThis.Request = Request
    globalThis.Response = Response
  })
}
