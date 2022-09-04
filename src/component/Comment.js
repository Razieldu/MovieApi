import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from "./Comment.module.css"
import { dealAvatarPath, dealTime } from "../helperFunction/Function";
function Comment() {
  const [data, setData] = useState();
  const [image, setImage] = useState({});
  const param = useParams();
  const urlData = param.movieId.split("=");

  useEffect(() => {
    const getComment = async () => {
      const getMovieComment = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${param.movieId}/reviews?api_key=9e3fb9c0b102c598b86ea4a98b8d6dcc&language=en-US&page=1`
        );
        if (!response.ok) {
          throw new Error("can not get data");
        }
        const data = await response.json();
        return data.results;
      };
      const getMovieImage = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${param.movieId}/images?api_key=9e3fb9c0b102c598b86ea4a98b8d6dcc`
        );
        if (!response.ok) {
          throw new Error("can not get data");
        }
        const data = await response.json();
        return data.posters[0];
      };
      try {
        const totalComment = await getMovieComment();
        setData(totalComment);
        const poster = await getMovieImage();
        setImage(poster);
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, []);

  return (
    <>
      <div
       className={classes.totalDiv}
   
      >
        {/* <h1>{urlData[0]}</h1> */}
        <h1 className={classes.bigTitle}>留言與評論</h1>
        <img
          alt={"poster"}
          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
        className={classes.photo}
        />
        <h1>{urlData[1]}</h1>
      </div>

      {data &&
        data.map((eachComment) => (
          <div key={eachComment.author} className={classes.commentTotalDiv} >
            <div
              className={classes.authorDiv}
   
            >
              {eachComment.author_details.avatar_path && (
                <>
                  {/* <p>{typeof eachComment.author_details.avatar_path}</p> */}
                  <img
                    className={classes.avatar}
                    src={`${
                      dealAvatarPath(eachComment.author_details.avatar_path)
                    }`}
                    alt={`${dealAvatarPath(
                      eachComment.author_details.avatar_path
                    )}`}
                  />
                </>
              )}
              {eachComment.author_details.avatar_path === null && (
              <img className={classes.avatar} src={"https://i.imgur.com/luwBw5x.png"} />
            )}
              <h3>{eachComment.author}</h3>
            </div>
            <hr />
            <h3>內容 :</h3>
            <p>{eachComment.content}</p>
            <h3>建立時間 : {dealTime(eachComment.created_at)}</h3>
            <h3>更新時間 : {dealTime(eachComment.created_at)}</h3>
            <hr />
          </div>
        ))}
    </>
  );
}

export default Comment;
