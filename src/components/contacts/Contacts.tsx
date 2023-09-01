import { contactListSelectors } from '../../redux/contactList/contactList.selectors';
import { useAppSelector } from '../../redux/hooks';
import styles from './Contacts.module.css';

export function Contacts() {
  const userLists = useAppSelector(contactListSelectors.contactLists);

  return <></>;
}
