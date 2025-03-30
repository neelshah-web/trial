import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  margin-top: 2rem;
  overflow-x: auto;
  border: 1px solid rgba(76,175,80,0.3);
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
`;

const Th = styled.th`
  background: rgba(76,175,80,0.1);
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid rgba(76,175,80,0.3);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(76,175,80,0.1);
`;

const Tr = styled.tr`
  transition: all 0.3s ease;

  &:hover {
    background: rgba(76,175,80,0.1);
  }
`;

interface ResultTableProps {
  results: any[];
}

const ResultTable: React.FC<ResultTableProps> = ({ results }) => {
  if (!results.length) {
    return null;
  }

  const columns = Object.keys(results[0]);

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            {columns.map(column => (
              <Th key={column}>{column}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => (
            <Tr key={index}>
              {columns.map(column => (
                <Td key={`${index}-${column}`}>{row[column]}</Td>
              ))}
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;