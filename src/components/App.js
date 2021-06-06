import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import samplefishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    const { params } = this.props.match;
    // reinstate localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes object to state
    this.setState({
      fishes: fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // take a copy of the current state
    const fishes = { ...this.state.fishes };
    // update that fish
    fishes[key] = updatedFish;
    // set the new state using setState
    this.setState({
      fishes: fishes,
    });
  };

  deleteFish = (key) => {
    // take a copy of state
    const fishes = { ...this.state.fishes };
    // set the fish we want to delete to null (for firebase)
    fishes[key] = null;
    // update state
    this.setState({
      fishes: fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: samplefishes,
    });
  };

  addToOrder = (key) => {
    // take a copy of state
    const order = { ...this.state.order };
    // either add to the order, or update the qty
    order[key] = order[key] + 1 || 1;
    // call setState to update our state object
    this.setState({
      order: order,
    });
  };

  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
