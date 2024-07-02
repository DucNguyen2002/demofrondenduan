import { Route, Routes } from 'react-router-dom';
import ROUTES from './routes';
import Home from '../layout/Home/Home';
import { useSelector } from 'react-redux';
const AppRoutes = () => {
    const { user, auth, userInfo } = useSelector(state => state.UserReducer);

    return (
        <Routes>
            <Route path='/' element={<Home />} >
                {ROUTES.filter(item => item.auth).map((route, index) => {
                    return <Route key={index} path={route.path} element={route.element} />;
                })}
                {userInfo.maQuyen === 1 &&
                    ROUTES.filter(item => !item.auth).map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))
                }

            </Route>

            {/* {ROUTES.map((route, index) => {
                return <Route key={index} path={route.path} element={route.element} />;
            })} */}
        </Routes>
    );
};

export default AppRoutes;