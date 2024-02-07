import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { lightBlue } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: lightBlue[100],
      color: lightBlue[500],
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: lightBlue[200],
    },
    '&:nth-of-type(even)': {
        backgroundColor: lightBlue[100],
      },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

export default function ScoreBoard({ data }){
    return (
        <div id='score-borad'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: lightBlue[500]}}> 
                    <TableRow>
                    <TableCell>Place</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                    <StyledTableRow 
                        key={index}
                    >
                        <StyledTableCell component="th" scope="row">
                        {index + 1}
                        </StyledTableCell>
                        <StyledTableCell >{row.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.score}</StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
                </Table>
          </TableContainer>
    
        </div>
    )
}