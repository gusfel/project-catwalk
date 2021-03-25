import React from 'react';

import RelatedProductsSect from './RelatedProductsSect/RelatedProductsSect.jsx';
import RatingsAndReviewsSect from './RatingsAndReviewsSect/RatingsAndReviewsSect.jsx';
import QuestionsAnswersSect from './QuestionsAnswersSect/QuestionsAnswersSect.jsx';
import OverviewSect from './OverviewSect/OverviewSect.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 14932,
      avgRating: 0,
      productInfo: {},
      styleInfo: {}
    };
    this.changePage = this.changePage.bind(this);
    this.getAverageRating = this.getAverageRating.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getStyleInfo = this.getStyleInfo.bind(this);
  };

  changePage(newid) {
    this.setState({id: newid})
  }

  getAverageRating(average) {
    this.setState({avgRating: average})
  }

  // componentDidMount() {
  // this.setState({id: 14034})
  // }

  getProductInfo(someInfo) {
    this.setState({productInfo: someInfo})
  }

  getStyleInfo(styleInfo) {
    this.setState({styleInfo: styleInfo})
  }

  render() {
    return (
      <div>
        <OverviewSect id={this.state.id} getProductInfo={this.getProductInfo} getStyleInfo={this.getStyleInfo} />
        <RelatedProductsSect id={this.state.id} changePage={this.changePage} avgRating={this.state.avgRating} productInfo={this.state.productInfo} styleInfo={this.state.styleInfo} />
        <QuestionsAnswersSect id={this.state.id} productInfo={this.state.productInfo}/>
        <RatingsAndReviewsSect id={this.state.id} getAverageRating={this.getAverageRating} />
      </div>
    );
  }
}

export default App;