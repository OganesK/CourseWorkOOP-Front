import React from "react"
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStyles from "./Style";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import backgroundImage from './background.jpg';
import { PieChart } from 'react-minimal-pie-chart';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

interface PropsTypes extends WithStyles<typeof useStyles>{

}

interface StateTypes {
    firstnameValue: string;
    lastnameValue: string;
    emailFormValue: string;
    passwordValue: string;
}

class SignInPage extends React.Component<PropsTypes> {

      state = {
            selected:0,
            hovered:undefined,
            amount:0,
            operationType:'Income',
        };
    render(){
        const lineWidth = 60;
        const defaultLabelStyle = {
            fontSize: '5px',
            fontFamily: 'sans-serif',
          };
        const { classes } = this.props;
        return(
          <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} style={{backgroundImage: `url(${backgroundImage})`}} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={5} square>
            <div className={classes.paper}>
              <h1>Текущие расходы:</h1>
              <PieChart
              style={{
                fontFamily:
                  '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '3px',
              }}
              data={[
                { title: 'Two', value: 50, color: '#C13C37', goal: 'Medicine' },
                { title: 'Three', value: 50, color: '#6A2135', goal:'Shop' },
                { title: 'Three', value: 50, color: '#6A2135', goal:'Shop' },
            ]}
              radius={PieChart.defaultProps.radius - 20}
              lineWidth={60}
              segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
              segmentsShift={(index) => (index === this.state.selected ? 6 : 1)}
              animate
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%\n' + dataEntry.goal}
              labelPosition={100 - lineWidth / 2}
              labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
              }}
              onClick={(_, index) => {
                  this.setState({
                      selected:index === this.state.selected ? undefined : index
                  })
              }}
              onMouseOver={(_, index) => {
                  this.setState({
                      hovered: index
                  })
              }}
              onMouseOut={() => {
                  this.setState({
                      hovered: undefined
                  })
              }}
                />;
                <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={this.state.amount}
            onChange={(e) => this.setState({amount: e.target.value})}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
           <FormControl component="fieldset">
            <FormLabel component="legend">Operation type</FormLabel>
            <RadioGroup row aria-label="Operation type" value={this.state.operationType} name="row-radio-buttons-group" onChange={(e) => this.setState({operationType: e.target.value})}>
                <FormControlLabel value="Income" control={<Radio />} label="Income" />
                <FormControlLabel value="Consumption" control={<Radio />} label="Consumption" />
            </RadioGroup>
            <Button variant="outlined" startIcon={this.state.operationType === 'Income' ? <AttachMoneyIcon /> : <MoneyOffIcon/>}>
                {this.state.operationType === 'Income' ? 'Deposit' : 'Spend'}
            </Button>
            </FormControl>
        </FormControl>
            </div>
          </Grid>
        </Grid>
        )
    }
}

export default withStyles(useStyles, { withTheme: true })(SignInPage);