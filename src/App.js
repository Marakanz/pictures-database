import React from 'react';
import { useEffect, useState } from 'react';
import Post from './post';
import paginate from './utils';
import useFetch from './useFetch';



function App() {

  const { loading, data,images } = useFetch();
  const [filteredData, setFilteredData] = useState([])
  const [ pages, setPages ] = useState([]);
  const [ rawData, setRawData] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    if (loading) return
    setFilteredData(data[page])
    setPages(data)
    setRawData(images)
  }, [loading, page])

  
  

  // FUNCTION FOR SWITCHING PAGES
  const handlePage = (index) => {
    setPage(index)
  }

  // PREV PAGE AND NEXT PAGE FUNCTIONS 
  // Prev Page
  const prevPage = () => {
    setPage(() =>{
      let prevPage = page - 1
      if (prevPage < 0) {
        prevPage = data.length-1
      }
      return prevPage
    })
  }
  // Next page
  const nextPage = () => {
    setPage(() =>{
      let nextPage = page + 1
      if (nextPage > data.length-1) {
        nextPage = 0
      }
      return nextPage
    })
  }

  //  SEARCH FUNCTION
  const searchValue = React.useRef('');
  const searchImage = () => {
    let result = []
    setSearchTerm(searchValue.current.value)
    console.log(searchTerm)
    result = images.filter((data) => {
      return data.title.search(searchTerm) !== -1;
    })
    const noOfPages = paginate(result);
    setPages(noOfPages)
    if ( pages.length > 0) {
      setPage(0)
      setFilteredData(pages[page])//get the page index of the paginated data
    } else {
      setFilteredData([])
    }
  }

  // SORT FUNCTION
  const handleChange = (value) => {
    console.log('filter value changed');
    console.log(value)
    let result;
    value === 'none' ? result = images : result = rawData.sort((a, b) => {
      if (value === 'ascending') {
        return a.title.localeCompare(b.title)
      } else if ( value === 'descending') {
        return b.title.localeCompare(a.title)
      } 
    })
    
    
    console.log(result)
    console.log(images)

    const items = paginate(result)
    setPage(0);
    setFilteredData(items[page]);
  }


  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  return (
    <div className='py-8'>
      {data.length > 0 ? (
        <>
          <div className="py-14 px-8 md:px-14">

            <div className='flex justify-between px-4'>
              <div className='w-28 md:w-52'>
                <form className=''>
                  <input className='search'
                    type="text"
                    placeholder='Search'
                    name='search'
                    ref={searchValue}
                    onChange={searchImage}></input>
                </form>
              </div>
              <div className='flex w-2/6 items-center '>
                <label className="country mx-0 text-400-gray">Filter:</label>
                <select className='sort mx-2 text-400-gray px-5 py-3 lg: px-8 py-4' id="country" name="country">
                  <option value="australia">None</option>
                  <option value="alphabetically">alphabetically</option>
                </select>
                <select 
                  className='sort mx-2'
                  id="country"
                  name="country"
                  onChange={(e) => handleChange(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </div>
            <div className='flex items-center my-10 justify-center bg-red-200 py-4'>
              <p >Get started with all the strength of rams belly button</p>
            </div>
          </div>
          <section className='flex flex-wrap justify-center'>
            {/* display all the Images in one page */}
            {filteredData.map((item, index) => {
              return (
                <Post key={index} {...item} />
              )
            })}
          </section>
          {/* If the loading is complete display the buttons  */}
          {!loading && <div className='flex justify-center items-center'>
            <button className='prev' onClick={prevPage}>prev</button>
            {data.map((item, index) => {
              return <button
                key={index}
                onClick={() => handlePage(index)}
                className={`${ index === page? 'block': 'hidden'} py-1 px-2 mr-2 bg-blue-700 text-white rounded`}>
                {index+1}
              </button>
            })}
            <span className='mx-4'>of</span>
            <span className='mr-3'>{pages.length}</span>
            <button className='next' onClick={nextPage}>next</button>
          </div>}
        </>
      ) : (
        <h1>No Posts to display</h1>
      )}
    </div>
  );
}

export default App;
