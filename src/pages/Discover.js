import React, { useEffect, useState } from "react";
import { Form, Input } from "reactstrap";

import { BsSearch } from "react-icons/bs";

//Components
import RequestCard from "../components/RequestCard";

//Css
import "../css/discover.page.css";
import { toast } from "react-toastify";

//API Calls
import { search } from "../helper/Calls/Search";

const Discover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState("");

  const handeSearch = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.warn("Empty Search Term Not Accepted...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    search(searchTerm)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrong!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="container">
      <h1 className="text-center p-2">Discover</h1>

      <div className="row">
        <div>
          <Form onSubmit={(e) => handeSearch(e)}>
            <Input
              placeholder="Search..."
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <span className="icon-holder">
              {" "}
              <BsSearch className="search-icon" onClick={handeSearch} />
            </span>
          </Form>

          <div className="my-4 ">
            {!users
              ? ""
              : users.length == 0
              ? "No User Found!"
              : users.map((values) => (
                  <RequestCard
                    userId={values._id}
                    userName={values.name}
                    profilePic={values.profilePic}
                    sent={true}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
