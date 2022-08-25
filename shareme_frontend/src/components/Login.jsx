import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    const { id, name, picture } = response;

    console.log(response);

    const imageUrl = picture.data.url;

    const newResonse = {
      email: "",
      familyName: response.name.split(" ")[1],
      givenName: response.name.split(" ")[0],
      googleId: id,
      imageUrl: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
      image: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
      name: response.name,
    };

    localStorage.setItem("user", JSON.stringify(newResonse));

    const doc = {
      _id: id,
      _type: "user",
      userName: name,
      image: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const responseGoogle = (response) => {
    console.log(response.profileObj);

    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor mb-4 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                >
                  <FcGoogle className="mr-4" /> Login in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />

            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_API_TOKEN}`}
              fields="name,email,picture"
              cssClass="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              icon="fa-facebook-f mr-5"
              callback={responseFacebook}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
