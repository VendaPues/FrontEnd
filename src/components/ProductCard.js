import * as React from "react";
import PropTypes from "prop-types";
import "./card.css";
import { Grid,IconButton } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';



const Input = styled(MuiInput)`
  width: 70px;
`;

function ProductCard({ productName, description, price, image }) {

    const priceU=parseFloat(price)*1000;

  const [value, setValue] = React.useState(10);
  
  const [amount, setAmount] = React.useState(priceU*10);

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    setAmount(event.target.value === '' ? '' : Number(event.target.value)*priceU)
  };

  const handleBlur = () => {
    if (value < 1) {
      setValue(1);
      setAmount(priceU);
    } else if( value > 10001){
        setValue(10000);
        setAmount(priceU*10000);
    }
  };

  return (
    <div className="card text-center">
      <div className="overflow">
        <img src={image} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body">
        <h4 className="card-productName">{productName}</h4>
        <p className="card-text"> {description ? description : productName}</p>
        <p className="card-text">Precio unitario: ${price} </p>
        <Grid container justifyContent="center" alignItems="flex-end">
            
            <Grid item xs={3}>
                <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </Grid>
            
            <Grid item xs={3} >
                <Input 
                    value={value}
                    size="small"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                    step: 10,
                    min: 0,
                    max: 10000,
                    type: 'number',
                    'aria-labelledby': 'non-linear-slider',
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <InputLabel  htmlFor="standard-adornment-amount">Total</InputLabel>
                <Input size="small"
                    style={{width:'120px'}}
                    disabled
                    id="standard-adornment-amount"
                    value={amount}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </Grid>
        </Grid>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  productName: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string.isRequired,
};

export default ProductCard;