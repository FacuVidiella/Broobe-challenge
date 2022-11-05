import { BrowserRouter, Switch, Route } from "react-router-dom";
import { getLocalStorage } from "./components/utility-funcs.js";
import {
  CreateIssue,
  Issues,
  Login,
  Register,
  Navigation,
  Protected,
  IssueEdit,
  Footer,
} from "./components/index.js";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        paddingBottom: "50px",
      }}
    >
      <BrowserRouter>
        <Navigation createIssue={!!getLocalStorage("token")} />
        <Switch>
          <Route exact path="/">
            <Login isLoggedIn={!!getLocalStorage("token")} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/issues">
            <Protected
              isLoggedIn={!!getLocalStorage("token")}
              children={<Issues token={getLocalStorage("token")} />}
            />
          </Route>
          <Route path="/create-issue">
            <Protected
              isLoggedIn={!!getLocalStorage("token")}
              children={<CreateIssue token={getLocalStorage("token")} />}
            />
          </Route>
          <Route path="/issue-edit/:id">
            <Protected
              isLoggedIn={!!getLocalStorage("token")}
              children={<IssueEdit token={getLocalStorage("token")} />}
            />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
