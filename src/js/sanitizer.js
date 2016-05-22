const rejectWordRegexes = [
  /dvd.*/, /xvid.*/, /brrip.*/, /r5.*/, /unrated.*/,
  /720p.*/, /x264.*/, /klaxxon.*/, /axxo.*/, /br_300.*/,
  /300mb.*/, /cd1.*/, /cd2.*/, /sample.*/
]
const extRegex = /\.[a-z]+$/
const b1Regex = /\[.*\]/g
const b2Regex = /\(.*\)/g
const b3Regex = /\{.*\}/g
const yearRegex = /\d\d\d\d.*$/
const nonAlphaNumRegex = /[^a-z0-9]/g

// Exported for tests
export default function sanitize(file) {
  // TODO maybe we can use some more properties of file here?
  // ignore non-video files
  if (!file.type.startsWith('video') &&
      !file.name.endsWith('.avi') &&
      !file.name.endsWith('.mp4') &&
      !file.name.endsWith('.mkv')) {
    return ''
  }

  let name = file.name

  name = name
    // strip extension and lower
    .toLowerCase().replace(extRegex, '')
    // remove stuff in brackets
    .replace(b1Regex, '')
    .replace(b2Regex, '')
    .replace(b3Regex, '')
    // remove year and following
    .replace(yearRegex, '')

  // remove reject words and following
  name = rejectWordRegexes.reduce((prev, cur) => {
    return prev.replace(cur, '')
  }, name)

  // remove non alphanumeric chars
  name = name
    .replace(nonAlphaNumRegex, ' ')
    .trim()

  return name;
}
