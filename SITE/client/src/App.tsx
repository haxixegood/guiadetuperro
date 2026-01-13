import ThankYou from "./pages/thank-you";
import SalesPage from "./pages/SalesPage";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { QuizProvider } from "./contexts/QuizContext";
import Quiz from "./pages/Quiz";
import PixelTracker from "./components/PixelTracker";
import { useEffect } from "react";
import { preloadImages, getQuizIconImages } from "./lib/imagePreload";

function Router() {
  return (
    <Switch>
      {/* Páginas específicas PRIMEIRO */}
      <Route path="/sales">
        <SalesPage />
      </Route>

      <Route path="/thank-you">
        <ThankYou />
      </Route>

      <Route path="/404">
        <NotFound />
      </Route>

      {/* Rota raiz SEM exact, por último */}
      <Route path="/">
        <Quiz />
      </Route>

      {/* Fallback */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  // Preload all quiz images on app mount
  useEffect(() => {
    const images = getQuizIconImages();
    preloadImages(images);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <QuizProvider>
            <PixelTracker />
            <Toaster />
            <Router />
          </QuizProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
