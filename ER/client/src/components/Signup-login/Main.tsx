import React, { useState } from "react";
import Alert from "../ui/Modal";
import Register from "./Register";
import Email from "./Email";
import Verification from "./Verification";
import Password from "./Password";

type Props = {
  closeAlert: () => void;
};

const Main: React.FC<Props> = ({ closeAlert }) => {
  const [route, setRoute] = useState<string>("Login");
  const [email, setEmail] = useState<string>("");

  return (
    <div>
      {route === "Login" && (
        <Alert
          component={<Email setRoute={setRoute} setEmail={setEmail} />}
          closeAlert={closeAlert}
          heading="Login"
        />
      )}
      {route === "Signup" && (
        <Alert
          component={
            <Register
              setRoute={setRoute}
              handleBack={() => setRoute("Login")}
            />
          }
          closeAlert={closeAlert}
        />
      )}
      {route === "Verification" && (
        <Alert
          closeAlert={closeAlert}
          component={<Verification setRoute={() => setRoute("Login")} />}
        />
      )}
      {route === "Password" && (
        <Alert
          closeAlert={closeAlert}
          component={<Password email={email} closeAlert={closeAlert} />}
        />
      )}
    </div>
  );
};

export default Main;
