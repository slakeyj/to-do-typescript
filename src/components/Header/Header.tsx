import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import earth from '../../img/earth.png';

const Header: React.FC = () => {
  return (
    <>
      <Box m={4} display='flex' justifyContent='center'>
        <Avatar
          alt='earth'
          src={earth}
          style={{
            width: '70px',
            height: '70px',
          }}
        />
        <Typography variant='h2' component='h1'>
          Plan It
        </Typography>
      </Box>
    </>
  );
};
export default Header;
