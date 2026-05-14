import React from 'react';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <HomeScreen navigation={{navigate: () => {}} as any} route={{} as any} />
  );
};

export default App;
