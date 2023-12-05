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
import MainPage from "./pages/MainPage";
import Chat from "./components/chat/Chat";

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
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Header/>
          <div className="background">
              <Routes>
                  <Route path="/" element={<MainPage/>}/>
                  <Route path="/:categoryIdx" element={<TopicPage/>}/>
                  <Route path="/topic-page/:topicId" element={<TopicDetailPage/>}/>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/user/:state" element={<UserManagePage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
