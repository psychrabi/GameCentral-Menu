export const sortByName = (data) => {
  return data?.sort((a, b) => (a.name < b.name ? -1 : Number(a.name > b.name)))
}
