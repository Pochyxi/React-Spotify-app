import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyAppBar from "./components/MyAppBar";
import MyHome from "./components/MyHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Artist from "./components/Artist";
import MusicPlayerSlider from "./components/MusicPlayer";
import Album from "./components/Album";
import Library from "./components/Library";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyAppBar />
        <Routes>
          <Route path="/" element={<MyHome />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/favourites" element={<Library />} />
        </Routes>
        <MusicPlayerSlider />
      </div>
    </BrowserRouter>
  );
}

export default App;
