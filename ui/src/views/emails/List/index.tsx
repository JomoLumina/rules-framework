import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import axios from 'src/utils/axios';
import { Box, Container, makeStyles } from '@material-ui/core';
import type { Theme } from 'src/theme';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import type { Email } from 'src/types/email';
import Results from './Results';
import Header from './Header';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const List: FC = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [emails, setEmails] = useState<Email[]>([]);

  const getEmails = useCallback(async () => {
    try {
      const response = await axios.get('/emails');
      if (isMountedRef.current) {
        console.log(response.data.emails);
        setEmails(response.data.emails);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getEmails();
  }, [getEmails]);

  return (
    <Page
      className={classes.root}
      title="Email List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results emails={emails} />
        </Box>
      </Container>
    </Page>
  );
};

export default List;
