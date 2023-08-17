// WIP
import { useState } from "react";

interface IProps {
  changeAuthNetwork: (network: string) => void;
  invite?: boolean
}

export function Home({
  changeAuthNetwork,
  invite
}: IProps) {
  const [forgetPasswordVisible, setForgetPasswordVisible] = useState(false);

  const toggleForgotPassword = () => {
    setForgetPasswordVisible((prev) => !prev);
  }

  return (
    <div className="home_main" style={{ backgroundImage: `url(${backimage})` }}>
      <div className="HomePanel container">
        <div className="row">
          <div className="col-12 banner-image">
            <img src={banner} alt="Company logo" />
          </div>
        </div>
        <div className="row buttons-cont">
          {!forgetPasswordVisible ?
            <Authentication {...props} />
            :
            <ForgotPassword {...props} />
          }
        </div>
      </div>
    </div>
  );
}