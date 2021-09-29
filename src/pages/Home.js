import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import Posts from "../components/Posts";
import { generateFeeds } from "../helper/Calls/Feeds";

const Home = ({ history }) => {
  const [user, setuser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");

    if (currentUser) {
      setuser(true);
      generateFeeds(currentUser, token)
        .then((res) => {
          let feedsShuffed = shuffle(res.data.feed);
          setFeeds(feedsShuffed);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setuser(false);
      history.push("/signin");
    }
  }, []);

  return (
    <div className="container base-div ">
      {console.log(feeds)}
      {loading && (
        <div className="spinner-div">
          <Spinner> </Spinner>
        </div>
      )}
      {!loading && (
        <div className="row">
          <div className="col-lg-5 col-md-9 offset-md-2 col-sm-12  offset-lg-4">
            {user ? (
              feeds.length === 0 ? (
                <h2 className="text-center">No Feeds Found</h2>
              ) : (
                feeds.map((feed) => (
                  <Posts
                    image={feed.image}
                    likes={feed.likes.length}
                    totalComments={feed.comments.length}
                    postId={feed._id}
                    userName={feed.posted_by.name}
                    profilePic={feed.posted_by.profilePic}
                  />
                ))
              )
            ) : (
              <div className="text-center">Please Signin To View The Page.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
