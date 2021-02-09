import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Box from '@material-ui/core/Box';
import './ButtonFilters.css';

type Filter = 'All' | 'Active' | 'Completed';
type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const ButtonFilters = ({ filter, setFilter }: Props) => {
  return (
    <Box ml={5} mb={5}>
      <ButtonGroup
        color='primary'
        variant='text'
        size='small'
        aria-label='small outlined button group'
      >
        <Button
          className={filter === 'All' ? 'active' : ''}
          onClick={() => {
            setFilter('All');
          }}
        >
          All
        </Button>

        <Button
          className={filter === 'Active' ? 'active' : ''}
          onClick={() => {
            setFilter('Active');
          }}
        >
          Active
        </Button>
        <Button
          className={filter === 'Completed' ? 'active' : ''}
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
