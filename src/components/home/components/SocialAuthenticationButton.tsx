import googleLogo from '../../../assets/logos/google-logo.png';
import linkedinLogo from '../../../assets/logos/linkedin-logo.png';
import facebookLogo from '../../../assets/logos/facebook-logo.png';
import microsoftLogo from '../../../assets/logos/microsoft-logo.png';
import changeCase from 'change-case';
import { socialNetworks } from '../../../constants';
import './SocialAuthenticationButton.styles.css';

interface IProps {
  network: socialNetworks,
  idPrefix?: string,
  onClick: () => void,
}

export function SocialAuthenticationButton({ network, onClick, idPrefix }: IProps) {
  const getImageSource = () => {
    switch (network) {
      case socialNetworks.LINKEDIN:
        return linkedinLogo;
      case socialNetworks.FACEBOOK:
        return facebookLogo;
      case socialNetworks.MICROSOFT:
        return microsoftLogo;
      default:
        // case socialNetworks.GOOGLE
        return googleLogo;
    }
  }
  
  return (
    <button
      id={`${idPrefix ?? ''}${network}`}
      className={"social-auth-button align-items-center " + network}
      onClick={onClick}
    >
      <div className='btn-icon d-flex align-items-center'>
        <img src={getImageSource()} alt="Social log in" />
      </div>
      <span className='btn-text d-flex align-items-center'>
        {/* {`Sign in with ${changeCase.capitalCase(network)}`} */}
      </span>
    </button>
  );
}