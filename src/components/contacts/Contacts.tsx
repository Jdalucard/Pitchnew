import { useGetUserContactItems } from '../../hooks';
import { contactListSelectors } from '../../redux/contactList';
import { useAppSelector } from '../../redux/hooks';
import styles from './Contacts.module.css';

export function Contacts() {
  const userContactItems = useAppSelector(
    contactListSelectors.contactListsWithItems,
  );

  useGetUserContactItems();

  console.log(userContactItems);
  return <></>;
}
