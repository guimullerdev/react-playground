import { BrowserRouter, Route, Switch, Link, useLoaderData, useLoaderError } from 'inferno-router';

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = (props) => {
    const data = useLoaderData(props);
    const err = useLoaderError(props);

    return (
        <div>
            <h2>About</h2>
            <p>{data?.body || err?.message}</p>
        </div>
    )
};

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>Components</Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
            exact
            path={match.url}
            render={() => <h3>Please select a topic.</h3>}
        />
    </div>
);

const MyWebsite = () => (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topics">Topics</Link></li>
            </ul>
            <hr />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} loader={() => fetch(new URL('/api/about', 'http://localhost:5110'))} />
                <Route path="/topics" component={Topics} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default MyWebsite;