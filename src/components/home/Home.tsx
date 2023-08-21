// WIP
import { useState } from "react";
import backgroundImage from '../../assets/images/pitchdb-background.png';
import logo from '../../assets/logos/pitchdb-logo.png';
import { AuthenticationDisplay, ForgotPasswordDisplay } from "./components";

interface IProps {
  isInvite?: boolean
}

export function Home({ isInvite }: IProps) {
  const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false);

  const toggleForgotPassword = () => {
    setForgetPasswordVisible((prev) => !prev);
  }

  return (
    <>
      <div className="home_main" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="HomePanel">
          <div className="banner-image">
            <img src={logo} alt="Company logo" />
          </div>
          <div className="buttons-cont">
            {!forgetPasswordVisible ?
              <AuthenticationDisplay
                isInvite={isInvite ?? false}
                toggleForgotPassword={toggleForgotPassword}
              />
              :
              <ForgotPasswordDisplay toggleForgotPassword={toggleForgotPassword} />
            }
          </div>
        </div>
      </div>
    </>
  );
}