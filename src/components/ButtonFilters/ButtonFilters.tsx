import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

type Filter = 'All' | 'Active' | 'Completed';
type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const useStyles = makeStyles({
  root: {
    border: '2px solid black',
  },
});

const ButtonFilters = ({ filter, setFilter }: Props) => {
  const classes = useStyles();
  return (
    <Box ml={5} mb={5}>
      <ButtonGroup
        color='primary'
        variant='text'
        size='small'
        aria-label='small outlined button group'
      >
        <Button
          className={filter === 'All' ? classes.root : ''}
          onClick={() => {
            setFilter('All');
          }}
        >
          All
        </Button>

        <Button
          className={filter === 'Active' ? classes.root : ''}
          onClick={() => {
            setFilter('Active');
          }}
        >
          Active
        </Button>
        <Button
          className={filter === 'Completed' ? classes.root : ''}
          onClick={() => {
            setFilter('Completed');
          }}
        >
          Completed
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default ButtonFilters;
