import React from 'react';
import { Link } from 'react-router-dom';
import SearchHeader from './SearchHeader';
import Footer from './Footer';
import '../css/Artist.css'

/* It handles the presentational side of the selected Artist */
function Artist(props) {
  /* this returns an array of Albums */
  let albums = [];
  albums = props.albums.map((item,i) => {
    let alt = `Image of ${item.name}`;
    return(
      <div className="col-sm-6 h-100" key={i}>
        <div className="card shadow p-3 mb-5 rounded h-40" >
          <Link to={{pathname: '/album', state: { albumId: item.id, albumImg: item.img, albumName: item.name, albumRelease: item.release }}}>
            <div className="row">
              <div className="col">
                <img className="card-img h-75" src={item.img} alt={item.name}></img>
              </div>
              <div className="col-8">
                <h5>{item.name}</h5>
                <h5>{item.release}</h5>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  });
  let rows = [];
  for (let i = 0; i < albums.length; i = i + 2) {
    let currentElement = albums[i];
    let nextElement = albums[i + 1];
    let row = <div className="row" key={i}>
        {currentElement}
        {nextElement}
      </div>;
    rows.push(row);
  }
  /* Displays the list of albums from the artist and all the presentational side of the Artist. */
  return(
    <div className="page-container">
      <SearchHeader />
      <div className="content-wrap">
        <div className="container description-container">
            <div className="row justify-content-center h-100">
              <div className="col-sm-8 h-100">
                <div className="row align-items-center h-100">
                  <div className="col-3 h-75 w-75">
                      <img className="h-100 w-100 description-img" src={props.artist.img} alt={props.artist.name} />
                  </div>
                  <div className="col-6">
                    <h3>{props.artist.name}</h3>
                    <h5>{props.artist.genre[0]}</h5>
                  </div>
                </div>
                <div className="col-sm-8">
                  <nav aria-label="breadcrumb">
                    <ol className="flex-nowrap breadcrumb pl-0">
                      <li className="breadcrumb-item text-truncate"><Link to="/"><span>Home</span></Link></li>
                      <li className="breadcrumb-item text-truncate"><Link to="/artists"><span>Artists</span></Link></li>
                      <li className="breadcrumb-item active" aria-current="page"><span>{props.artist.name}</span></li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        <div className="line-separator my-5"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              {rows}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Artist;