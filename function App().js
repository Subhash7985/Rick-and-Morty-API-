function App() {

const [items, setItems] = useState([])
const [info, setInfo] = useState([])
const [isLoading, setIsLoading] = useState(true)
const [query, setQuery]=useState('')
const [page, setPage] = useState(1)
const [id, setId] = useState(1)

useEffect(() => {
const fetchItems = async () => {
  const result = await axios(`https://rickandmortyapi.com/api/character?page=${page}&?name=${query}$id=${id}`)
  
 
  console.log("Character:", result.data.results)

  setItems(result.data.results)
  setInfo(result.data.info)
  setIsLoading(false)
}

 fetchItems()
}, [query, page, id])

const nextHandler = (event) => {
event.preventDefault()
if(page <= info.pages) {
  setPage(page + 1)
}else {
  setPage(1)
}}

const prevHandler = (event) => {
event.preventDefault()
if(page>1){
  setPage(page - 1)
}else{
  setPage(page)
}}

return (
<div className='container'>
<Router>
  <Switch>
    <Route exact path='/' >
      <Header />
      <Search getQuery={(q) =>setQuery(q) } />
      <div className='pagination'>

      <button className='btn-prev'
      onClick={(event) => prevHandler(event)}
      >
        Prev
      </button>
      <p className='number'>{page}/{info.pages}</p>
      <button className='btn-next'
      onClick={(event) => nextHandler(event)}
      >
       Next
      </button>
      </div>
      <Character isLoading={isLoading} items={items} />
    </Route>
    <Route path='/info'>
      <Header />
      <Info items={items} id={id}/>
    </Route>
  </Switch>
</Router>
</div>
)}



const Character = ({ items, isLoading }) => {
    return isLoading ? (
    <Spinner />
    ) : (
    <div>
    
    <section className='cards'>
      {items.map((item) => (
          <CharacterItem key={item.id} item={item}></CharacterItem>
          ))}
    </section>
    
    </div>
)}

const CharacterItem = ({ item }) => {

    return (
    <div className="card">
        <div className="card-header">
            <img src={item.image} alt='img' />
        </div>
        <div className="card-body">
            <h4>
                Name: {item.name}
            </h4>
            <p>
                Status:  {item.status}
            </p>
        </div>
    </div>
)}

const Info = () => {

    const [items, setItems] = useState([])
    const [info, setInfo] = useState([])
    const [id, setId] = useState('')
    
    useEffect(() => {
        const fetchItems = async () => {
          const result = await axios(`https://rickandmortyapi.com/api/character?id=${id}`)
      
          setItems(result.data.results)
          setInfo(result.data.info)
        }
        fetchItems()
      }, [id])
    
    return (
        <div>
        
    <div className="card-info">
        <div className="card-header-info">
        {/* <img src={props.image} alt='img' /> */}
        </div>
        <div className="card-body-info">
            <h4>
                Name: {items.name} or {name} or ?
            </h4>
            <p>
                Gender: {items.gender} or {gender} or ?
            </p>
        </div>
    </div>
        </div>
)}


