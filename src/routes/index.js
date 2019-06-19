import React from 'react';
import { Route, Switch} from 'react-router-dom';
import App from '../components/App';
import Home from '../components/Home';
import ArtistsList from '../components/ArtistsList';
import ArtistContainer from '../components/ArtistContainer';
import AlbumContainer from '../components/AlbumContainer';

const getRoutes = function() {

    return (
        <div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/artists" component={ArtistsList} />
              <Route exact path="/artist" component={ArtistContainer} />
              <Route exact path="/album" component={AlbumContainer} />
            </Switch>
        </div>
    )
};

export default getRoutes;
