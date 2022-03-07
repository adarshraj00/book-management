import Landing from "./pages/Landing";
import Routes from "./Routes";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux'
import Swal from "sweetalert2";
import { useEffect } from "react";
import { toastsActions } from "./store";
export const Comp = () => {
  const dispatch = useDispatch();
  const messageOnalert = useSelector((state) => {
    return state.toasts;
  });
  useEffect(() => {
    if (messageOnalert.msg !== "") {
      Swal.fire(messageOnalert.msg);
      dispatch(toastsActions.clearToast());
    }
  }, [messageOnalert]);
  return <></>;
};

function App() {
  return (
    <div className="App">
      <Comp/>
      <Routes />
    </div>
  );
}

export default App;
