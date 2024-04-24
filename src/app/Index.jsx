import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Alert }  from '@/_components/Alert';
import { Inquiries } from '@/inquiries';

function App() {
  return (
    <div className="app-container bg-light">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <NavLink exact to="/" className="nav-item nav-link">お問い合わせフォーム</NavLink>
        </div>
      </nav>
      <Alert />            
        <div className="container pt-4 pb-4">
          <Switch>
            <Route exact path="/" component={Inquiries} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
    </div>
  );
}

export { App }; 