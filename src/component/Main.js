import React from "react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import classes from "./Main.module.css";
const languageData = [
  { LangCultureName: "zh-TW", DisplayName: "中文 - 台灣" },
  { LangCultureName: "zh-CN", DisplayName: "中文 - 中國" },
  { LangCultureName: "ko-KR", DisplayName: "韓國 - 韓國" },
  { LangCultureName: "ja-JP", DisplayName: "日文 - 日本" },
  { LangCultureName: "en-US", DisplayName: "美國英語" },
  { LangCultureName: "fr-FR", DisplayName: "法國 - 法國" },
  { LangCultureName: "de-DE", DisplayName: "德國 - 德國" },
];

const movieSearchType = [
  { value: "top_rated", display: "好評電影" },
  { value: "upcoming", display: "即將上映電影" },
  { value: "popular", display: "近期流行電影" },
  { value: "now_playing", display: "現正熱映電影" },
  // { value: "latest", display: "最新電影" },
];

function Main() {
  const [searchType, setSearchType] = useState("top_rated");
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState(0);
  const [data, setData] = useState([]);
  const [movieVideo, setMovievideo] = useState([]);
  const [language, setlanguage] = useState("zh-TW");

  const api = process.env.REACT_APP_My_APi;

  useEffect(() => {
    const getAllData = async () => {
      const getMovie = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${searchType}?api_key=${api}&language=${language}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("can not get data");
        }
        const { results } = await response.json();

        const movieid = await results.map((movie) => movie.id);
        // console.log({ results, movieid })
        return { results, movieid };
      };
      const getmovieMovie = async (id) => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9e3fb9c0b102c598b86ea4a98b8d6dcc&language=en-US`
        );
        if (!response.ok) {
          throw new Error("can not get data");
        }
        const data = await response.json();

        let movieDataId;
        if (data && data.results[0] && data.results[0].key) {
          movieDataId = data.results[0].key;
        } else {
          movieDataId = "FindNoVideo";
        }

        return { movieKey: movieDataId, id: id };
      };

      async function cycleGet(movieid) {
        let movieUrls = [];
        for (let item of movieid) {
          // console.log(item)
          const movieyouTubeid = await getmovieMovie(item);
          movieUrls.push(movieyouTubeid);
        }
        // console.log(movieUrls);
        return movieUrls;
      }
      try {
        const { movieid: movieidArray, results: data } = await getMovie();

        setData(data);
        const movieUrl = await cycleGet(movieidArray);
        // console.log(movieUrl);
        setMovievideo(movieUrl);
      } catch (error) {
        console.log(error);
      }
    };
    getAllData();
  }, [page, language, searchType]);

  const previousPageHandler = () => {
    setPage((prev) => {
      if (prev === 1) {
        return 500;
      }
      return prev - 1;
    });
  };

  const nextPageHandlder = () => {
    setPage((prev) => {
      if (prev === 500) {
        return 1;
      }
      return prev + 1;
    });
  };

  const pageChangeHandler = (event) => {
    setPageInput(event.target.value);
  };

  const pageInputHandler = () => {
    setPage(Number(pageInput));
  };

  const languageChangeHandler = (event) => {
    setlanguage(event.target.value);
  };

  const searchTypeChangeHandler = (event) => {
    setSearchType(event.target.value);
  };

  const filteredLanguage = languageData.filter(
    (each) => each.LangCultureName === language
  );

  const filteredSearchType = movieSearchType.filter(
    (each) => each.value === searchType
  );
  return (
    <div className="App">
      <h1 className={classes.bigTitle}>Movie Database</h1>
      <h1 className={classes.subTitle}>
        目前列表 : {filteredSearchType[0].display}
      </h1>
      <h1 className={classes.subTitle}>
        目前語系 : {filteredLanguage[0].DisplayName}
      </h1>
      <h1 className={classes.subTitle}>目前頁面 : {page}</h1>
      <div className={classes.selectDiv} style={{}}>
        <select onChange={searchTypeChangeHandler}>
          {movieSearchType.map((type) => (
            <option key={type.value} value={type.value}>
              {type.display}
            </option>
          ))}
        </select>

        <select onChange={languageChangeHandler}>
          {languageData.map((data) => (
            <option key={data.LangCultureName} value={data.LangCultureName}>
              {data.DisplayName}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.buttonDiv}>
        <button onClick={previousPageHandler}>上一頁</button>

        <input
          value={pageInput}
          max="500"
          onChange={pageChangeHandler}
          placeholder="預定前往頁面"
        ></input>
        <button className={classes.buttonAhead} onClick={pageInputHandler}>
          前往
        </button>
        <button onClick={nextPageHandlder}>下一頁</button>
      </div>
      <div className={classes.hrDiv}></div>
      {data.length > 0 &&
        data.map((movie) => (
          <div className={classes.movieDetailTotal} key={movie.id}>
            <div className={classes.movieandContentDiv} id={movie.id}>
              {movieVideo.length > 0 &&
                movieVideo
                  .filter((good) => good.id === movie.id)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={classes.movieContentWithPhotoDiv}
                    >
                      {/* <h1>{item.movieKey}</h1>
                    <h1>{item.id}</h1> */}
                      {item.movieKey !== "FindNoVideo" && (
                        <div className={classes.movieVideoDiv} key={item.id}>
                          {/* <ReactPlayer
                            className={classes.video}
                            url={`https://www.youtube.com/watch?v=${item.movieKey}`}
                          /> */}
                          <iframe
                            className={classes.video}
                            title="video"
                            width="640"
                            height="360"
                            data-thumbnail-src="https://i.ytimg.com/vi/TCaM1Tl01lQ/0.jpg"
                            src={`https://www.youtube.com/embed/${item.movieKey}?autoplay=0&loop=0&controls=1&start=100&end=600&rel=1`}
                            frameborder="0"
                            allowfullscreen
                          />
                        </div>
                      )}
                      {item.movieKey === "FindNoVideo" && (
                        <h1 className={classes.noVideo}>查無相關影片</h1>
                      )}
                    </div>
                  ))}
              <div className={classes.movieContent}>
                <h2>成人電影 : {movie.adult ? "是 " : "否"}</h2>
                <h2>movieId : {movie.id}</h2>
                <h2>語言 : {movie.original_language}</h2>
                <h2>電影原片名 : {movie.original_title}</h2>
                <h2>片名: {movie.title}</h2>
                <h2>人氣度 : {movie.popularity}</h2>
                <h2>電影簡介 :</h2>
                <h4 className={classes.overview}> {movie.overview}</h4>
                <h2>發行日期 : {movie.release_date}</h2>
                <h2>平均分數 : {movie.vote_average}</h2>
                <h2>投票總數 : {movie.vote_count}</h2>

                <Link to={`${movie.id}=${movie.title}`}>
                  <h2 className={classes.watchComment}>點擊查看評論</h2>
                </Link>
              </div>
            </div>

            <div className={classes.photoDiv}>
              <img
                className={classes.moviePhoto}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Main;
