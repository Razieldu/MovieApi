import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Comment.css";
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
        style={{
          textAlign: "center",
          padding: "50px 0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: "40px",
        }}
      >
        {/* <h1>{urlData[0]}</h1> */}
        <h1 style={{ fontSize: "70px" }}>留言與評論</h1>
        <img
          alt={"poster"}
          src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
          style={{ width: "300px", height: "400px" }}
        />
        <h1>{urlData[1]}</h1>
      </div>

      {data &&
        data.map((eachComment) => (
          <div key={eachComment.author} style={{ padding: "25px 80px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {eachComment.author_details.avatar_path && (
                <>
                  {/* <p>{typeof eachComment.author_details.avatar_path}</p> */}
                  <img
                    className="avatar"
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
              <img className="avatar" src={"https://i.imgur.com/luwBw5x.png"} />
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
