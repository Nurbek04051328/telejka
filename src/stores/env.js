
const url = 'http://95.130.227.52:3017'

const project_title = 'Telejka'

const langs = [
  {
    label: 'O`zbekcha',
    language: 'uz'
  },
  {
    label: 'Русский',
    language: 'ru'
  }
]

const getKey = (object, value) => Object.keys(object).find((key) => object[key] == value)

const latin = {
  а: 'a',
  қ: 'q',
  с: 's',
  д: 'd',
  е: 'e',
  р: 'r',
  ф: 'f',
  т: 't',
  г: 'g',
  й: 'y',
  ҳ: 'h',
  у: 'u',
  ж: 'j',
  и: 'i',
  к: 'k',
  о: 'o',
  л: 'l',
  п: 'p',
  з: 'z',
  х: 'x',
  с: 's',
  в: 'v',
  б: 'b',
  н: 'n',
  м: 'm',
  ш: 'sh',
  ч: 'ch',
  ю: 'yu',
  '-': '-',
  ' ': '-',
}

const convertToSlug = (value) => {
  return value.trim()
    .toLowerCase()
    .split('')
    .map((letter) => {
      if (Object.prototype.hasOwnProperty.call(latin, letter)) {
        return latin[letter];
      }
      if (Object.prototype.hasOwnProperty.call(latin, getKey(latin, letter))) {
        return letter;
      }
    })
    .join('')
}

const addZero = (v) => (v < 10 ? `0${v}` : v)

const convertDate = (value = new Date(), type = null) => {
  let date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getHours())}:${addZero(date.getMinutes())} ${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
    : `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
}

export { url, project_title, convertDate, langs, convertToSlug }
