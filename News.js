import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';



const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const capitalize = (str) => {
    const capitalize = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalize;
  }


  // document.title = `DailyHunt | (${capitalize(props.category)})`


  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=44f1855e551a43998fba55756cf8d855&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    props.setProgress(30);

    let data = await fetch(url);
    props.setProgress(70);

    let parseData = await data.json();
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
    updateNews()
  }, [])



  // const handlePrevClick = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=44f1855e551a43998fba55756cf8d855&page=${page - 1}&pageSize=${props.pageSize}`
  //   setLoading(true)

  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   setArticles(parseData.articles);
  //   setPage(page-1);
  //   setLoading(false)
  // }

  // handleNextClick = async () => {

  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=44f1855e551a43998fba55756cf8d855&page=${page + 1}&pageSize=${props.pageSize}`
  //   setState({
  //     loading: true
  //   })
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   setArticles(parseData.articles);
  // setPage(page+1);
  // setLoading(false)
  // }
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=44f1855e551a43998fba55756cf8d855&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)

  }

  return (

    <>
      <div className='container  my-3'>
        <h2 className='text-center' style={{ margin: "40px 0px", marginTop: "90px" }}>DailyHunt - Top  {capitalize(props.category)} Headlines</h2>
        {/* {loading ? <Spinner /> : ""} */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">

            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-4" key={element.url ? element.url : ""}>
                    <NewsItem title={element.title ? element.title : "Title Not Found"} description={element.description ? element.description : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://img.etimg.com/thumb/msid-95112214,width-1070,height-580/photo.jpg"} newsUrl={element.url ? element.url : ""} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : "dd/mm/yyyy"} source={element.source.name ? element.source.name : "Unknown"} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>

      {/* <div className="container d-flex justify-content-between">
          <button className='btn btn-dark' disabled={page <= 1} onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / `${props.pageSize}`)} className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      <hr />
    </>
  )

}

export default News

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}