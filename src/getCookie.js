export default function getCookie (cname) {
  console.log(document.cookie.split('; ')
  .find((row) => row.startsWith(cname)))
  return document.cookie.split('; ')
    .find((row) => row.startsWith(cname))
    .split('=')[1];
}