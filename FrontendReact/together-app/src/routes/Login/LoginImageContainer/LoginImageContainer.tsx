import loginImage from "../../../assets/images/containerimages/loginImage.jpeg";
import newLogo from "../../../assets/images/newLogo.png";
import "./LoginImageContainer.css";

export function LoginImageContainer() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <img
        src={loginImage}
        alt="Register"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        className="grey-background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <img
          className="logo"
          src={newLogo}
          alt="logo"
          width={150}
          height={150}
        />
        <div
          className="together-text"
          onClick={() => localStorage.clear()}
          style={{ cursor: "pointer" }}
        >
          Together
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "36%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <div className="lead">Join the Movement, Feel the Unity</div>
      </div>
    </div>
  );
}
