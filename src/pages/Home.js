import { useEffect, useState } from "react";
import { Spinner } from "reactstrap";
import Posts from "../components/Posts";
import { generateFeeds } from "../helper/Calls/Feeds";
import { getAllInteractions } from "../helper/Calls/Friends";

const Home = ({ history }) => {
  const [user, setuser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);

  //Shuffle Posts Before Showing To The User
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  //Preloading User Data
  const getUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem("userId"));
    const token = localStorage.getItem("token");
    //Checking if User Exists And Loading Information
    if (currentUser) {
      setuser(true);
      generateFeeds(currentUser, token)
        .then((res) => {
          let feedsShuffed = shuffle(res.data.feed);
          setFeeds(feedsShuffed);
          setLoading(false);
        })
        .catch((err) => console.log(err));
      getAllInteractions(token, currentUser)
        .then((res) => {
          console.log();
          localStorage.setItem("followers", JSON.stringify(res.data.user));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setuser(false);
      // Redirecting User To Singin Page
      history.push("/signin");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="container base-div ">
      {/* Spinner While Posts Are Loading */}
      {loading && (
        <div className="spinner-div">
          <Spinner> </Spinner>
        </div>
      )}
      {!loading && (
        <div className="row">
          <div className="col-lg-5 col-md-9 offset-md-2 col-sm-12  offset-lg-4">
            {/* Looping Through User Feeds */}
            {user ? (
              feeds.length === 0 ? (
                <h2 className="text-center">No Feeds Found</h2>
              ) : (
                feeds.map((feed) => (
                  <Posts
                    image={feed.image}
                    likes={feed.likes}
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
