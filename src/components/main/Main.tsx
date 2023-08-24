import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserData, userSelectors } from "../../redux/user";
import { LoadingDisplay } from "../../common";
import { loadingDisplayTypes } from "../../types";

export function Main() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(userSelectors.userData);
  const userIsLoading = useAppSelector(userSelectors.isLoading);

  const [isAdminMode, setIsAdminMode] = useState(false);

  const fetchUser = useCallback(async () => {
    const cookies = new Cookies();
    const token = cookies.get('jwt');
    const response = await dispatch(getUserData(token)).unwrap();

    if (!response) {
      navigate('/');
    } else {
      const isAdmin = cookies.get('admin-token');
      setIsAdminMode(isAdmin);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (userIsLoading) {
    return <LoadingDisplay type={loadingDisplayTypes.entireScreen} />
  }

  return (
    <>
    </>
  );
}