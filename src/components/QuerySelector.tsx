import React from 'react';
import styled from 'styled-components';
import { predefinedQueries } from '../data/queries';

const SelectorContainer = styled.div`
  margin-bottom: 1rem;
  position: relative;
`;

const SelectWrapper = styled.div`
  position: relative;
  &:after {
    content: '▼';
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #4CAF50;
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(76,175,80,0.3);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(16,16,28,0.9);
  color: #ffffff;
  cursor: pointer;
  appearance: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 15px rgba(76,175,80,0.2);
  }

  option {
    background: #10101c;
    color: white;
    padding: 1rem;
  }

  optgroup {
    background: #10101c;
    color: #4CAF50;
    font-weight: bold;
    padding: 0.5rem;
  }
`;

interface SavedQuery {
  id: string;
  name: string;
  query: string;
}

interface QuerySelectorProps {
  onSelect: (query: string) => void;
  customQueries: SavedQuery[];
}

const QuerySelector: React.FC<QuerySelectorProps> = ({ onSelect, customQueries }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const allQueries = [...predefinedQueries, ...customQueries];
    const selectedQuery = allQueries.find(
      q => q.id === event.target.value
    );
    if (selectedQuery) {
      onSelect(selectedQuery.query);
    }
  };

  return (
    <SelectorContainer>
      <SelectWrapper>
        <Select onChange={handleChange} defaultValue={predefinedQueries[0].id}>
          <optgroup label="Predefined Queries">
            {predefinedQueries.map(query => (
              <option key={query.id} value={query.id}>
                {query.name}
              </option>
            ))}
          </optgroup>
          {customQueries.length > 0 && (
            <optgroup label="Saved Queries">
              {customQueries.map(query => (
                <option key={query.id} value={query.id}>
                  {query.name}
                </option>
              ))}
            </optgroup>
          )}
        </Select>
      </SelectWrapper>
    </SelectorContainer>
  );
};

export default QuerySelector;