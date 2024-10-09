import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./services/connexion.ts";
import App from "./App.tsx";

import "./index.css";
import DetailCard from "./pages/DetailCard.tsx";
// import { CardDetailleLoader } from "./component/CardDetaille.tsx";
import CommandCarde from "./pages/CommandCarde.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/detail/:id",
    element: <DetailCard></DetailCard>,
    // loader: CardDetailleLoader,
  },
  {
    path: "/detail/commente/:id",
    element: <CommandCarde></CommandCarde>,
    // loader: CommentCardLoader,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
