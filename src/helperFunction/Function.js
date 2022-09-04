export const dealTime = (time) => {
  const removeT = time.split("T");
  const removeDot = removeT[1].split(".");
  return removeT[0] + " " + removeDot[0];
};

export const dealAvatarPath = (path) => {
  // if (path===null) {
  //   return "https://i.imgur.com/luwBw5x.png";
  // } else {

    const adjPath = path.split("/");
    if (adjPath[0] === "" && adjPath[1] !== "https:") {
      return `https://image.tmdb.org/t/p/w500${path}`;
    } else {
      return path.substr(1);
    }
  // }
};
