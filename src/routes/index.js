//layouts
import { HeaderOnly } from 'components/Layout';
import routerConfig from 'configs/routes';
//Pages
import Home from 'pages/Home';
import Following from 'pages/Following';
import Upload from 'pages/Upload';
import Profile from 'pages/Profile';
import Search from 'pages/Search';

//public Routes
const publicRoutes = [
    { path: routerConfig.home, component: Home },
    { path: routerConfig.following, component: Following },
    { path: routerConfig.profile, component: Profile },
    { path: routerConfig.upload, component: Upload, layout: HeaderOnly },
    { path: routerConfig.search, component: Search, layout: null },
];

//private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
