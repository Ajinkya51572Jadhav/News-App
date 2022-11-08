import React from 'react'


const NewsItem = (props) => {

  let { title, description, imgUrl, newsUrl, author, date, source } = props;
  return (
    <>
      <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: "15%" }}>
          {source}

        </span>
        <img src={imgUrl} className="card-img-top" alt="Img" />
        <div className="card-body">
          <h5 className="card-title">{title} ...</h5>
          <p className="card-text"><small className="text-muted">{author} {new Date(date).toGMTString()}</small></p>
          <p className="card-text">{description} ......</p>
          <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </>

  )

}

export default NewsItem