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

import { Queries } from './graphql/Query';
import { Mutations } from './graphql/Mutation';

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
    operationType:'INCOME',
    balance: 0,
    direction: '',
    transactions: [],
  };

  userId = window.localStorage.getItem('id');

  componentDidMount(){
    // alert(this.userId)
    Queries.getData(Number(this.userId)).then(res => {
      console.log(res)
      this.setState({balance: res.data.user.balance,
                    transactions: res.data.user.transactions})
                  })
  }

  groupBy = function(xs:any, key: any) {
    return xs.reduce(function(rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  render(){
      const lineWidth = 60;
      const defaultLabelStyle = {
          fontSize: '5px',
          fontFamily: 'sans-serif',
        };

      const expenceGroups = this.groupBy(this.state.transactions.filter((group: any) => group.type === 'CONSUMPTION'), 'transactionDirection')
      //@ts-ignore
      const totalAmount = this.state.transactions.filter((group: any) => group.type === 'CONSUMPTION').reduce((acc, cons) => {
        //@ts-ignore
        acc += -(cons.amount)
        return acc
      }, 0)
      console.log(totalAmount)
      // const filteredExpenceGroups = expenceGroups.filter((group: any) => group.type === 'CONSUMPTION')
      const formatedGroups = Object.keys(expenceGroups).map((key, index) => (
        {title:key, value: expenceGroups[key].reduce((acc:number, item: any)=> {
          acc = acc + Number(item.amount)
          return acc;
        },0),
        goal: key,
        color:'#FF5631'
      }
      ))
      console.log(expenceGroups)
      console.log(formatedGroups)
      const { classes } = this.props;

      const newTransactionHandler = async () => {
        const answer = await Mutations.createNewTransaction(
          //@ts-ignore
          Number(this.userId),
          this.state.operationType === 'INCOME' ? this.state.amount : (-this.state.amount),
          this.state.direction.length === 0 ? "Default direction" : (this.state.direction.toString()),
          (this.state.operationType.toString())
        )

        if(answer.data.createTransaction === 'Success'){
          window.location.reload();
          alert("Транзакция успешно сохранена")
        }else{
          alert('Попробуйте еще раз, введенные данные некорректны.')
        }
      }

      return(
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} style={{backgroundImage: `url(${backgroundImage})`}} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={5} square>
          <div className={classes.paper}>
            <h1>Текущие расходы: {totalAmount}</h1>
            <h1>Баланс: {this.state.balance}</h1>
            <PieChart
            style={{
              fontFamily:
                '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
              fontSize: '3px',
            }}
            // { title: 'Two', value: 50, color: '#C13C37', goal: 'Medicine' },
            data={formatedGroups}
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
                <Grid container direction='row'>
        <div>
        <OutlinedInput
          id="outlined-adornment-amount"
          value={this.state.amount}
          onChange={(e) => this.setState({amount: e.target.value})}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
        </div>
        <div>
        <OutlinedInput
          id="direction"
          value={this.state.direction}
          onChange={(e) => this.setState({direction: e.target.value})}
          placeholder='Direction'
        />
        </div>
        </Grid>
          <FormControl component="fieldset">
          <FormLabel component="legend">Operation type</FormLabel>
          <RadioGroup row aria-label="Operation type" value={this.state.operationType} name="row-radio-buttons-group" onChange={(e) => this.setState({operationType: e.target.value})}>
              <FormControlLabel value="INCOME" control={<Radio />} label="Income" />
              <FormControlLabel value="CONSUMPTION" control={<Radio />} label="Consumption" />
          </RadioGroup>
          <Button onClick={newTransactionHandler} variant="outlined" startIcon={this.state.operationType === 'INCOME' ? <AttachMoneyIcon /> : <MoneyOffIcon/>}>
              {this.state.operationType === 'INCOME' ? 'Deposit' : 'Spend'}
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