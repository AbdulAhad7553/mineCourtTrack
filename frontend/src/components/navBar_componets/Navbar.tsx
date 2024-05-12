import { useState, useEffect, ReactElement } from 'react';
import NBState1 from './State1';
import NBState2 from './State2';

/* 
  pageIndex Dictionary:
  Value: 1 Key: Standard (Homepage)
  Value: 2 Key: Dashboard Link on top left (CreateTeams)
*/

const Navbar = ({ pageIndex }: { pageIndex: number }) => {
  // Define state to potentially hold a React element or be null
  const [currentNavbar, setCurrentNavbar] = useState<ReactElement | null>(null);
  
  useEffect(() => {
    switch(pageIndex) {
      case 1:
        setCurrentNavbar(<NBState1 />);
        break;
      case 2:
        setCurrentNavbar(<NBState2 />); // Set to NBState2 when pageIndex is 2
        break;
      default:
        setCurrentNavbar(null); // No navbar or a default component for other cases
    }
  }, [pageIndex]); // Depend on pageIndex to re-evaluate when it changes

  return (
    <div>
      {currentNavbar}
    </div>
  );
};

export default Navbar;
