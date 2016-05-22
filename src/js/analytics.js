export function trackEvent(data) {
  // ga is on the window object
  data.hitType = 'event'
  ga('send', data)
}

export function trackException(data) {
  data.hitType = 'exception'
  ga('send', data)
}
