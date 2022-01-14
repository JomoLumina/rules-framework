import React from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box, Table, TableBody, TableCell, TableHead, TableRow,
} from '@material-ui/core';
import { Email } from '../../../types/email';

interface EmailsTableProps {
  paginatedEmails: Email[];
}

const EmailsTable: FC<EmailsTableProps> = ({
  paginatedEmails,
}) => (
  <Box>
    <PerfectScrollbar>
      <Box minWidth={400}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Id
              </TableCell>
              <TableCell align="center">
                Email Address
              </TableCell>
              <TableCell align="center">
                Valid
              </TableCell>
              <TableCell align="center">
                Reason
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmails.map((email) => (
              <TableRow
                hover
                key={email.id}
              >
                <TableCell align="center">
                  {email.id}
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                      {email.address}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                      {email.valid}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                      {email.reason}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Box>
);

EmailsTable.propTypes = {
  paginatedEmails: PropTypes.array.isRequired,
};
export default EmailsTable;
