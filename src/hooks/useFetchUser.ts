import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUserData, getUserProfileImage, userSelectors } from "../redux/user";
import axios from "axios";
import { socketsCommon } from "../sockets";
import { getUserCreditCounter, getUserSubscriptionPlan } from "../redux/subscription";
import { getUserContactLists } from "../redux/contactList/contactList.thunks";

export function useFetchUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(userSelectors.userData);
  
  const fetchUser = useCallback(async () => {
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    socketsCommon.setJWT(token);

    const response = await dispatch(getUserData()).unwrap();

    if (!response?.response) {
      navigate('../');
    } else {
      dispatch(getUserProfileImage());
      dispatch(getUserSubscriptionPlan());
      dispatch(getUserCreditCounter());
      dispatch(getUserContactLists({ page: 0, noLimit: true }));
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [fetchUser, userData]);
}