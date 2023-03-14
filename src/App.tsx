import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Currencies } from "./interfaces/bitcoinTypes";
import { useGetBitcoinDataQuery } from "./services/app";
import { changeCurrency } from "./store/appSlice";
import { useAppDispatch, useAppSelector } from "./store/redux-hook";

const INTERVAL_TIME = 5000;

function App() {
  const { currency } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetBitcoinDataQuery(undefined, {
    pollingInterval: INTERVAL_TIME,
  });

  const handleChange = (event: SelectChangeEvent<Currencies>) => {
    dispatch(changeCurrency(event.target.value as Currencies));
  };

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  return (
    <>
      <h1>Bitcoin Prices</h1>
      {data && (
        <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
          <Select value={currency} onChange={(e) => handleChange(e)}>
            {Object.keys(data).map((key) => {
              return (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
      <span>{data && data[currency].last}</span>
    </>
  );
}

export default App;
