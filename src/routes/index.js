import React from 'react';
import { Route, Switch} from 'react-router-dom';
import App from '../components/App';
import Home from '../components/Home';
import ArtistsList from '../components/ArtistsList';
import Album from '../components/Album';
import ArtistContainer from '../components/ArtistContainer';

const getRoutes = function() {

    return (
        <div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/artists" component={ArtistsList} />
              <Route exact path="/artist" component={ArtistContainer} />
              <Route exact path="/album" component={Album} />
            </Switch>
        </div>
    )
};

export default getRoutes;
