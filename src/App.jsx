import { useEffect } from 'react';
import 'animate.css';
import './App.css';
import Routing from './Components/Routing/Routing';
import { getAuthToken } from './Services/AuthService/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Components/Loader/Loader';
import { getAllMenuItems } from './Redux/Actions/menuMasterAction';
import { getAllUsers } from './Redux/Actions/UserMasterAction';
import { getAllCompanies } from './Redux/Actions/CompanyMasterAction';
import { getAllUsersCategory } from './Redux/Actions/userCategoryMasterAction';
import { getAllItems } from './Redux/Actions/ItemMasterAction';
import { getAllOrderDetails } from './Redux/Actions/OrderDetailsByUserAction';
import { getUserWiseItems } from './Redux/Actions/UserWiseItemMaster';
import moment from 'moment';
import { getCountDetail } from './Redux/Actions/GetTotalOrderCountAction';
import { getTopUserDetail } from './Redux/Actions/GetTopUserAction';
import { getTopItemDetail } from './Redux/Actions/GetTopItemAction';
import { getDailyOrder } from './Redux/Actions/dailyOrderSummaryAction';
import States from './States';
import { getAllParty } from './Redux/Actions/AllPartyAction';

function App() {
  const dispatch = useDispatch()
  const aa = useSelector(state => state.topItem.topItem)
  useEffect(() => {
    let token = getAuthToken();
    if (token) {
      dispatch(getAllMenuItems())
      dispatch(getAllUsers())
      dispatch(getAllItems())
      dispatch(getAllCompanies())
      dispatch(getAllUsersCategory())
      dispatch(getUserWiseItems())
      dispatch(getCountDetail())
      dispatch(getTopUserDetail())
      dispatch(getTopItemDetail())
      dispatch(getDailyOrder())
      dispatch(getAllParty())

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    {/* <States /> */}
      <Loader />
      <Routing />
    </>
  );
}

export default App;
