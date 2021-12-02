import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

interface PropsTypes {
  checkedValue: number[];
  setChecked: (value: number) => React.MouseEventHandler<HTMLDivElement> | undefined;
  transactions: {
    id: number;
    title: string;
    transactionDirection: string;
    amount: number;
  }[];
}

class PrevTransactionsList extends React.Component<PropsTypes> {
  render(){
    return(
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {this.props.transactions.map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
            key={value.id}
            disablePadding
          >
            <ListItemButton disabled={this.props.checkedValue.length !== 0 && this.props.checkedValue.indexOf(value.id) === -1} onClick={this.props.setChecked(value.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={this.props.checkedValue.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Amount ${value.amount}`} />
              <ListItemText id={labelId} primary={`Direction ${value.transactionDirection}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    )
  }
}

export default PrevTransactionsList;