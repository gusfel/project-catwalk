import React from 'react';
import axios from 'axios';

import AvgRecs from './AvgRecs.jsx';
import ReviewCount from './ReviewCount.jsx';
import List from './List.jsx';
import AvgRatings from './AvgRatings.jsx';
import MoreReviewsButton from './MoreReviewsButton.jsx';
import AddReviewButton from './AddReviewButton.jsx';
import WriteYourReview from './WriteYourReview.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import CharacteristicsSummary from './CharacteristicsSummary.jsx';
import dummyReviewListData from './dummyData/dummyReviewListData.js';
import styles from './reviews.module.css';


class RatingsAndReviewsSect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewList: [],
      reviewCount: '',
      currentProductId: this.props.id,
      averageRating: '',
      recsPercentage: 0,
      addReview: false,
      characteristics: {},
      ratings: {},
      recommended: {},
      ratingsCount: 0
    };

    this.getReviews = this.getReviews.bind(this);
    this.calculateAverageRating = this.calculateAverageRating.bind(this);
    this.handleAddReview = this.handleAddReview.bind(this);
    this.sendNewReview = this.sendNewReview.bind(this);
  }

  getReviews(id) {
    axios.get('/reviews', {
      params: {
        id: id
      }
    })
    .then((response) => {
      // console.log('data from server ', response.data.results)
      this.setState({
        reviewList: response.data.results,
        reviewCount: response.data.results.length
      })
    })
    .catch(error => {
      console.error(error)
    });
  }

  getMetadata(id) {
    axios.get('/reviews/meta', {
      params: {
        id: id
      }
    })
    .then((response) => {
      // console.log('metadata from server ', response.data)
      this.setState({
        characteristics: response.data.characteristics,
        recommended: response.data.recommended,
        ratings: response.data.ratings
      }, this.calculateAvgAndPercent)
    })
    .catch(error => {
      console.error(error)
    });
  }


  calculateAverageRating() {
    let count = 0;
    let avg = 0;

    if (!this.state.ratings) {
      this.setState({averageRating: avg})
    }

    for (var key in this.state.ratings) {
      this.state.ratings[key] = Number(this.state.ratings[key]);
      count += this.state.ratings[key]
      avg += (this.state.ratings[key] * Number(key))
    }

    this.setState({totalRatings: count})
    avg = Math.round(avg/count * 10) / 10
    this.setState({averageRating: avg})
    this.props.getAverageRating(avg);
    return avg;
  }

  calculatePercentageRecommended() {
    let yes = Number(this.state.recommended.true);
    let no = Number(this.state.recommended.false);

    let percentageRec = (yes / (yes + no)) * 100;
    percentageRec = Math.round((percentageRec * 10) / 10)
    this.setState({recsPercentage: percentageRec});
    return percentageRec;
  }

  handleAddReview() {
    this.setState({
      addReview: !this.state.addReview
    })
  }

  calculateAvgAndPercent() {
    this.calculateAverageRating();
    this.calculatePercentageRecommended();
  }

  sendNewReview(reviewData) {
    reviewData.product_id = this.state.currentProductId
    axios({
      method: 'post',
      url: '/reviews',
      data: reviewData
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.error(error)
    })
  }

  componentDidMount() {
    this.getReviews(this.state.currentProductId);
    this.getMetadata(this.state.currentProductId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id !== this.props.id) {
      this.getReviews(this.props.id);
      this.getMetadata(this.props.id);
    }
  }

  render() {
    return(
      <div className={styles.reviewsContainer}>
        <div className={styles.reviewsGrid}>
            <h1 className={`${styles.componentTitle} ${styles.sectionTitle}`}>RATINGS AND REVIEWS</h1>
            <div className={styles.averageNumRow}>
              <AvgRatings averageRating={this.state.averageRating}/>
            <div className={styles.recRow}>
              <AvgRecs recsPercentage={this.state.recsPercentage} />
              </div>
            </div>
            <div className={styles.starGraphs}>
              <RatingBreakdown totalRatings={this.state.totalRatings} ratings={this.state.ratings} />
            </div>
            <div className={styles.charGraphs}>
              <CharacteristicsSummary characteristics={this.state.characteristics} />
            </div>
          {/* <div className={styles.count}>

          </div> */}
          <div className={styles.listCol}>
            <ReviewCount reviewCount={this.state.reviewCount}/>
            <List reviewList={this.state.reviewList}/>
          </div>
          <div className={`${styles.listButtons} ${styles.buttonsRow}`}>
              <MoreReviewsButton />
              <AddReviewButton handleAddReview={this.handleAddReview}/>
          </div>
        </div>
        {!this.state.addReview ? null : <WriteYourReview characteristics={this.state.characteristics} sendNewReview={this.sendNewReview} addReview={this.state.addReview} />}
      </div>
    )
  }
}

export default RatingsAndReviewsSect;