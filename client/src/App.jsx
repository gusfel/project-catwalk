import React from 'react';
import styles from './test.module.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1 className={styles.title} id="id">GANG GANG</h1>
      </div>
    );
  }
}
export default App;