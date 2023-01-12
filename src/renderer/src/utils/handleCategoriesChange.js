import { useStateContext } from '../components/contexts/ContextProvider.jsx'
export const handleCategoriesChange = (event) => {
  const { setType, setTitle } = useStateContext()

  setType(event.target.value)
  let index = event.target.selectedIndex
  setTitle(event.target[index].text)
}
