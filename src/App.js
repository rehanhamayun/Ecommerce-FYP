import React from 'react';
import './App.css';
import Checkout from './Components/pages/checkout/checkout.component';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.action';
import { HomePage } from './Components/pages/home/HomePage.component';
import { Route, Switch,Redirect } from 'react-router-dom';
import ShopPage from './Components/pages/shop/shop.page.component';
import Header from './Components/pages/header/header.component';
import {auth , createUserProfileDoc} from './Components/firebase/firebase.utils';
import SignInAndSignUp from './Components/pages/sign-in-sign-up Page/sign-in-sign-up.component';

class App extends React.Component {


  unsubscribedFromAuth = null
  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribedFromAuth=auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id : snapShot.id ,
              ...snapShot.data()
            
          });
          
        });
        
      }
      setCurrentUser(userAuth)
      
    });
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }


render(){
  
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          path="/signin"
          render={() =>
            this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
          }
        />
      </Switch>
    </div>
  );

}
  }
  const mapStateToProps = ({user}) => ({
    currentUser : user.currentUser
  })

  const mapDispatchToProps = dispatch => ({
    setCurrentUser :  user => dispatch(setCurrentUser(user))
  })

export default connect(mapStateToProps, mapDispatchToProps)(App);
