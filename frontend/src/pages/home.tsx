import { RootState } from "@/redux/store";
import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";

function HomePage() {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <div>
        <h1 style={{ color: "white" }}>Full Name: {currentUser.fullName}</h1>
        <h1 style={{ color: "white" }}>Bio: {currentUser.bio}</h1>
        <h1 style={{ color: "white" }}>Username: {currentUser.username}</h1>
        <h1 style={{ color: "white" }}>Email: {currentUser.email}</h1>
        <Image
          src={currentUser.photoProfile}
          width={"100px"}
          height={"100px"}
        />
      </div>
    </>
  );
}

export default HomePage;
