import "./App.css";
import { useEffect, useState } from "react";
import getApiOmdbApi from "./api/service";
import SearchIcon from "./Search.svg";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Mic from "./mic.png";
import Voice from "./voice-search.png";

const MovieCard = ({ movie }) => {
  const { imdbID, Year, Poster, Title, Type } = movie;
  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

function App() {
  const [movies, setIsMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    getApiOmdbApi(keyword)
      .then(({ data: { Search: res } }) => {
        setIsMovie(res);
      })
      .catch(() => "");
  }, [keyword]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <span className="text-danger">
        Browser doesn't support speech recognition.
      </span>
    );
  }

  console.log("tes :", keyword);

  return (
    <>
      <div className="app">
        <h1>Movie Mania</h1>

        <div className="search">
          <input
            value={search || transcript}
            className="this-search"
            onChange={(e) => setSearch(e.target.value || resetTranscript)}
            type="text"
            placeholder="Search"
          />
          <div className="microphone-listening">
            {listening === true && (
              <img
                src={Voice}
                alt="mic-logo"
                onClick={SpeechRecognition?.stopListening}
              />
            )}

            {listening === false && (
              <img
                src={Mic}
                alt="mic-logo"
                onClick={SpeechRecognition?.startListening}
              />
            )}
          </div>
          <img
            src={SearchIcon}
            onClick={() => setKeyword(transcript || search)}
            alt="search"
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Data . . .</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
