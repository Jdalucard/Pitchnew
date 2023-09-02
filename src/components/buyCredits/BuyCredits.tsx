import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../redux/hooks';
// import { getCities, getCountries, getStates } from '../../redux/searchParameters';
import { Bundles, IBundle, ISubscription, Subscriptions } from './components';
import styles from './BuyCredits.module.css';
import { formatDateToReadable } from '../../common';

export interface IBuyingItem {
  selectedPlan?: ISubscription;
  selectedBundle?: IBundle;
}

export interface IFormData {
  country: ILocationParameter | null;
  state: ILocationParameter | null;
  city: ILocationParameter | null;
  address: string;
  name: string;
}

interface ILocationParameter {
  _id: string;
  label: string;
  value: string;
  refId: string;
}

export function BuyCredits() {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const [formData, setFormData] = useState<IFormData>({
  //   country: null,
  //   state: null,
  //   city: null,
  //   address: '',
  //   name: '',
  // });

  // const [citiesList, setCitiesList] = useState<ILocationParameter[]>([]);
  // const [stateList, setStatesList] = useState<ILocationParameter[]>([]);
  // const [countriesList, setCountriesList] = useState<ILocationParameter[]>([]);
  // const [orderSuccess, setOrderSuccess] = useState(false);
  const [beginTransaction, setBeginTransaction] = useState(false);
  const [successItem, setSuccessItem] = useState<IBuyingItem | null>(null);

  // const fetchUserCountries = useCallback(async () => {
  //   const countries = await dispatch(getCountries()).unwrap();

  //   if (countries) {
  //     setCountriesList(countries);
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   fetchUserCountries();
  // }, [fetchUserCountries]);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       [event.target.name]: event.target.value,
  //     }
  //   });
  // }

  // const handleCountryChange = async (selectedCountry: ILocationParameter | null) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       country: selectedCountry,
  //       state: selectedCountry ? null : prev.state,
  //       city: selectedCountry ? null : prev.city,
  //     }
  //   });

  //   if (!selectedCountry) {
  //     setStatesList([]);
  //     setCitiesList([]);
  //   } else {
  //     const states = await dispatch(getStates(selectedCountry.refId)).unwrap();

  //     if (states) {
  //       setStatesList(states);
  //     }
  //   }
  // }

  // const handleStateChange = async (selectedState: ILocationParameter | null) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       state: selectedState,
  //     }
  //   });

  //   if (selectedState) {
  //     const cities = await dispatch(getCities(selectedState.refId)).unwrap();

  //     if (cities) {
  //       setCitiesList(cities);
  //     }
  //   }
  // }

  // const handleCityChange = (selectedCity: ILocationParameter | null) => {
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       city: selectedCity,
  //     }
  //   });
  // }

  const toggleBeginTransaction = (beginTransaction: boolean) => {
    setBeginTransaction(beginTransaction);
  };

  const toggleSuccessItem = (successItem: IBuyingItem) => {
    setSuccessItem(successItem);
  };

  return (
    <>
      {!successItem ? (
        <>
          <Subscriptions
            beginTransaction={beginTransaction}
            toggleBeginTransaction={toggleBeginTransaction}
            toggleSuccessItem={toggleSuccessItem}
          />
          <Bundles
            beginTransaction={beginTransaction}
            toggleBeginTransaction={toggleBeginTransaction}
            toggleSuccessItem={toggleSuccessItem}
          />
        </>
      ) : (
        <div className={styles.paymentConfirmedWrapper}>
          <Typography variant="h3" color="text.primary" gutterBottom>
            Upgrade processed successfully
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Transaction date:</b> {formatDateToReadable(new Date(), true)}
          </Typography>
          {successItem.selectedPlan ? (
            <>
              <Typography variant="body1" color="text.primary">
                <b>Plan:</b> {successItem.selectedPlan.name}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <b>Price:</b>{' '}
                {`$${successItem.selectedPlan.price} / ${successItem.selectedPlan.interval}`}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" color="text.primary">
                <b>Bundle:</b> {successItem.selectedBundle?.type}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <b>Price:</b> {`$${successItem.selectedBundle?.price}`}
              </Typography>
              <Typography variant="body1" color="text.primary">
                <b>Credits:</b> {successItem.selectedBundle?.amount}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('../outreach-sequences-mail')}
            sx={{ mt: '1rem' }}
          >
            Back to main page
          </Button>
        </div>
      )}
    </>
  );
}
