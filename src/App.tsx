import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { githubLight } from '@uiw/codemirror-theme-github';
import { predefinedQueries } from './data/queries';
import { executeQuery } from './utils/queryExecutor';
import QuerySelector from './components/QuerySelector';
import ResultTable from './components/ResultTable';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(180deg, rgba(16,16,28,0.8) 0%, rgba(16,16,28,0.9) 100%);
  min-height: 100vh;
  box-shadow: 0 0 40px rgba(0,0,0,0.3);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const Header = styled.header`
  margin-bottom: 2rem;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #4CAF50, #45a049, #4CAF50);
    background-size: 200% 100%;
    animation: gradient 2s linear infinite;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px rgba(76,175,80,0.3);
  letter-spacing: 2px;
`;

const EditorContainer = styled.div`
  margin-bottom: 2rem;
  border: 1px solid rgba(76,175,80,0.3);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(76,175,80,0.1);
  transition: all 0.3s ease;
  height: 150px;

  &:hover {
    box-shadow: 0 0 30px rgba(76,175,80,0.2);
    transform: translateY(-2px);
  }

  .cm-editor {
    height: 150px;
  }
`;

const ButtonContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76,175,80,0.3);
    &:before {
      left: 100%;
    }
  }

  &.secondary {
    background: linear-gradient(45deg, #6c757d, #5a6268);
  }
`;

const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(76,175,80,0.3);
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  background: rgba(255,255,255,0.05);
  color: #ffffff;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 15px rgba(76,175,80,0.2);
  }

  &::placeholder {
    color: rgba(255,255,255,0.5);
  }
`;

interface SavedQuery {
  id: string;
  name: string;
  query: string;
}

function App() {
  const [currentQuery, setCurrentQuery] = useState(predefinedQueries[0].query);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [customQueryName, setCustomQueryName] = useState('');
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);

  useEffect(() => {
    const fetchSavedQueries = async () => {
      try {
        if (!db) {
          throw new Error('Firestore is not initialized');
        }
        
        const querySnapshot = await getDocs(collection(db, 'saved_queries'));
        const queries: SavedQuery[] = [];
        querySnapshot.forEach((doc) => {
          queries.push({
            id: doc.id,
            ...doc.data() as Omit<SavedQuery, 'id'>
          });
        });
        setSavedQueries(queries);
      } catch (error) {
        console.error('Error fetching saved queries:', error);
        toast.error('Failed to load saved queries. Please check console for details.');
      }
    };

    fetchSavedQueries();
  }, []);

  const handleQueryChange = (value: string) => {
    setCurrentQuery(value);
  };

  const handleQuerySelect = (query: string) => {
    setCurrentQuery(query);
  };

  const handleExecuteQuery = () => {
    const results = executeQuery(currentQuery);
    setQueryResults(results);
    toast.success('Query executed successfully');
  };

  const handleSaveQuery = async () => {
    if (!customQueryName.trim()) {
      toast.error('Please enter a name for your query');
      return;
    }

    try {
      if (!db) {
        throw new Error('Firestore is not initialized');
      }

      // Check for duplicate names
      const isDuplicate = savedQueries.some(
        query => query.name.toLowerCase() === customQueryName.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error('A query with this name already exists');
        return;
      }

      // Add the document to Firestore
      const docRef = await addDoc(collection(db, 'saved_queries'), {
        name: customQueryName.trim(),
        query: currentQuery
      });

      // Update local state
      const newQuery = {
        id: docRef.id,
        name: customQueryName.trim(),
        query: currentQuery
      };

      setSavedQueries(prev => [...prev, newQuery]);
      setCustomQueryName('');
      toast.success('Query saved successfully');
    } catch (error) {
      console.error('Error saving query:', error);
      toast.error('Failed to save query. Please try again.');
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>SQL Query Viewer</Title>
        <QuerySelector 
          onSelect={handleQuerySelect} 
          customQueries={savedQueries}
        />
      </Header>

      <InputContainer>
        <Input
          type="text"
          placeholder="Enter a name for your query"
          value={customQueryName}
          onChange={(e) => setCustomQueryName(e.target.value)}
        />
      </InputContainer>

      <EditorContainer>
        <CodeMirror
          value={currentQuery}
          theme={githubLight}
          extensions={[sql()]}
          onChange={handleQueryChange}
          height="150px"
        />
      </EditorContainer>

      <ButtonContainer>
        <Button onClick={handleExecuteQuery}>
          Execute Query
        </Button>
        <Button 
          className="secondary"
          onClick={handleSaveQuery}
        >
          Save Query
        </Button>
      </ButtonContainer>

      <ResultTable results={queryResults} />
    </AppContainer>
  );
}

export default App;