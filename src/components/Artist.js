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
    let alt = `Image of ${item.name}`
    return(
      <div className="col-sm-6 " key={i}>
        <div className="card shadow p-3 mb-5 bg-white rounded h-75" >
          <Link to={{pathname: '/album', state: { albumId: item.id, albumImg: item.img, albumName: item.name, albumRelease: item.release }}}>
            <div className="row">
              <div className="col">
                <img className="card-img h-75" src={item.img.url} alt={item.name}></img>
              </div>
              <div className="col-8">
                <h4>{item.name}</h4>
                <h4>{item.release}</h4>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  });
  /* Displays the list of albums from the artist and all the presentational side of the Artist. */
  return(
    <div>
      <SearchHeader />
      <div className="container">
        <div className="card shadow p-3 mb-5 bg-white rounded h-30" >
          <div className="row">
            <div className="col">
              <img className="card-img h-75" src={props.artist.img} alt={props.artist.name} />
            </div>
            <div className="col-8">
              <h3>{props.artist.name}</h3>
              <h3>{props.artist.genre}</h3>
            </div>
          </div>
        </div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span>Home</span></Link></li>
            <li className="breadcrumb-item"><Link to="/artists"><span>Artists</span></Link></li>
            <li className="breadcrumb-item active" aria-current="page"><span>{props.artist.name}</span></li>
          </ol>
        </nav>
        <div className="row">
          {albums}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Artist;