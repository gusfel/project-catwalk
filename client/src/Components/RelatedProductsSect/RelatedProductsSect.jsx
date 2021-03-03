import React from 'react';
import RelatedProductsList from './RelatedProductsList.jsx'
import YourOutfitsList from './YourOutfitsList.jsx'
import axios from 'axios';

class RelatedProductsSect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RelatedProductsList: [],
      YourOutfitsList: [],
      cachedinfo: [],
      previouslyCached : []
    };
    this.addToYourOutfits = this.addToYourOutfits.bind(this);
    this.addToCache = this.addToCache.bind(this);
  }

  addToYourOutfits() {
    this.setState({YourOutfitsList: [...this.state.YourOutfitsList, this.props.id]})
    console.log(this.state.YourOutfitsList)
  }

  addToCache(obj) {
    if(this.state.cachedinfo.filter(product => {product.id === obj.id}).length > 0) {
    } else {
      this.state.cachedinfo.push(obj);
      console.log('cache', this.state.cachedinfo);
    }
  }

  // componentDidMount() {
  //   axios.get('/RelatedProducts', {params: {itemid: this.props.id}})
  //   .then((res) => {
  //     this.setState({RelatedProductsList: res.data}, ()=>{
  //       //do the thing
  //     })
  //   })
  // }

  render() {
    {
      if(!this.state.previouslyCached.includes(this.props.id)){
        this.state.previouslyCached.push(this.props.id)
        axios.get('/RelatedProducts', {params: {itemid: this.props.id}})
        .then((res) => {
          this.setState({RelatedProductsList: res.data})
        })
      }
    }
    return(
    <div>
      <h1>Related Products Section</h1>
      <RelatedProductsList RelatedProductsList={this.state.RelatedProductsList} changePage={this.props.changePage} addToCache={this.addToCache}
      cachedinfo={this.state.cachedinfo}/>
      <YourOutfitsList YourOutfitsList={this.state.YourOutfitsList} addToYourOutfits={this.addToYourOutfits}/>
    </div>
    )
  }
}

export default RelatedProductsSect;