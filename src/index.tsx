import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import reportWebVitals from './reportWebVitals';
import Header from "./components/header/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import TopicPage from "./pages/TopicPage";
import {QueryClient, QueryClientProvider} from "react-query";
import TopicDetailPage from "./pages/TopicDetailPage";
import LoginPage from "./pages/LoginPage";
import UserManagePage from "./pages/UserManagePage";

const queryClient = new QueryClient(
    {
        defaultOptions: {
            queries: {
            }
        }
    }
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Header/>
              <div className="background">
                  <Routes>
                      <Route path="/" element={<TopicPage/>}/>
                      <Route path="/:categoryIdx" element={<TopicPage/>}/>
                      <Route path="/topic-page/:topicId" element={<TopicDetailPage/>}/>
                      <Route path="/login" element={<LoginPage/>}/>
                      <Route path="/user/:state" element={<UserManagePage/>}/>
                  </Routes>
              </div>
          </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
