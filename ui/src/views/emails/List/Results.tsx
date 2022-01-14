import React, { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  InputAdornment,
  SvgIcon,
  TablePagination,
  TextField,
  makeStyles,
} from '@material-ui/core';
import {
  Search as SearchIcon,
} from 'react-feather';
import type { Theme } from 'src/theme';
import type { Email } from 'src/types/email';
import EmailsTable from './EmailsTable';

interface ResultsProps {
  className?: string;
  emails: Email[];
}

const applyQuery = (emails: Email[], query: string): Email[] => emails?.filter((email) => {
  let matches = true;

  if (query) {
    let containsQuery = false;
    if (email['address']?.toLowerCase().includes(query.toLowerCase())) {
      containsQuery = true;
    }

    if (!containsQuery) {
      matches = false;
    }
  }

  return matches;
});

const applyPagination = (emails: Email[], page: number,
  limit: number): Email[] => emails.slice(page * limit, page * limit + limit);

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  queryField: {
    width: 500,
  },
}));

const Results: FC<ResultsProps> = ({
  className,
  emails,
  ...rest
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 16));
  };

  const filteredEmails = applyQuery(emails, query);
  const paginatedEmails = applyPagination(filteredEmails, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Search email"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
      </Box>
      <EmailsTable paginatedEmails={paginatedEmails} />
      <TablePagination
        component="div"
        count={filteredEmails.length}
        onChangePage={(event, newPage) => handlePageChange(newPage)}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  emails: PropTypes.array.isRequired,
};

export default Results;
