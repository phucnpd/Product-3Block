import { Autocomplete, Button, InputAdornment, Link, Typography } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import { m } from 'framer-motion';

// ----------------------------------------------------------------------

// const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
//   width: '280px !important',
// });

// ----------------------------------------------------------------------

export default function ShopProductSearch({ black, setBlack, setPage, gender }) {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  function getBlackList() {
    setIsLoading(true);
    fetch('https://api3blockserver.herokuapp.com/db/api/system/3block/getAllBlackPublic', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // throw 'Err';
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('blackList', JSON.stringify(json));
        setBlack(json);
        setPage(0);
        setIsLoading(false);
        enqueueSnackbar('Update Black Lists Successfully!', { variant: 'success' });
      })
      .catch((err) => {
        setIsLoading(false);
        enqueueSnackbar('Update Black Lists Failure!', { variant: 'error' });
      });
  }

  // const navigate = useNavigate();

  // const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  // eslint-disable-next-line
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (values) => {
    const dateBlack = JSON.parse(localStorage.getItem('blackList'));
    // const dateBlack = black;
    var blackSearchResult;
    const value = values.toLowerCase().trim();
    if (gender.length === 0) {
      blackSearchResult = dateBlack.filter((da) => {
        return da.url.includes(value);
      });
    } else {
      blackSearchResult = dateBlack.filter((da) => {
        if (gender.includes(da.level.charAt(0).toUpperCase() + da.level.slice(1))) {
          return da.url.includes(value);
        }
        return false;
      });
    }

    setSearchQuery(value);
    setBlack(blackSearchResult);
    setPage(0);

    // setSearchResults(c);
    // try {
    //   setSearchQuery(value);
    //   if (value) {
    //     const response = await axios.get('/api/products/search', {
    //       params: { query: value },
    //     });

    //     if (isMountedRef.current) {
    //       setSearchResults(response.data.results);
    //     }
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleClick = (name) => {
    // navigate(`${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(name)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      // handleClick(searchQuery);
      setSearchQuery(searchQuery);
    }
  };

  return (
    <>
      <Autocomplete
        size="small"
        // autoHighlight
        popupIcon={null}
        value={searchQuery}
        freeSolo={true}
        // PopperComponent={PopperStyle}
        options={searchResults}
        onInputChange={(event, value) => handleChangeSearch(value)}
        // getOptionLabel={(product) => product.name}
        // noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <InputStyle
            {...params}
            stretchStart={200}
            placeholder="Search URL..."
            onKeyUp={handleKeyUp}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, product, { inputValue }) => {
          const {
            name,
            // cover
          } = product;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);

          return (
            <li {...props}>
              {/* <Image alt={cover} src={cover} sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }} /> */}
              <Link underline="none" onClick={() => handleClick(name)}>
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="subtitle2"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Link>
            </li>
          );
        }}
      />
      {isLoading && (
        <m.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Button color="primary" variant="contained" onClick={getBlackList}>
            Update Data
          </Button>
        </m.div>
      )}

      {!isLoading && (
        <Button color="primary" variant="contained" onClick={getBlackList}>
          Update Data
        </Button>
      )}
    </>
  );
}
