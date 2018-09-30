import * as React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { IRootState } from './store/rootReducer';
import { getCurrentComic, getCurrentPage, getMaxPage } from './store/data-layer/comic/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { FetchLatestComic } from './store/data-layer/comic/actions/FetchLatestComic';
import { ComicVM } from './models/view-models/ComicVM';
import { FetchNextComic } from './store/data-layer/comic/actions/FetchNextComic';
import { FetchPreviousComic } from './store/data-layer/comic/actions/FetchPreviousComic';

interface PropsFromState {
  currentComic: ComicVM | null;
  currentPage: number;
  maxPage: number;
}

interface PropsFromDispatch {
  fetchLatestComic: typeof FetchLatestComic;
  fetchNextComic: typeof FetchNextComic;
  fetchPreviousComic: typeof FetchPreviousComic;
}

type Props = PropsFromState & PropsFromDispatch;

class App extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    this.props.fetchLatestComic();
    this.handlePreviousComic = this.handlePreviousComic.bind(this);
    this.handleNextComic = this.handleNextComic.bind(this);
  }

  public render() {
    const { currentComic } = this.props;
    if (currentComic) {
      return (
        <div className="App">
          <h1>{currentComic.safe_title}</h1>
          <h2>Comic Date: {`${currentComic.month}/${currentComic.day}/${currentComic.year}`}</h2>
          <button onClick={this.handlePreviousComic}>Previous</button>
          <button onClick={this.handleNextComic}>Next</button>
          <div>
            <img alt={currentComic.alt} src={currentComic.img} />
          </div>
        </div>
      );
    }
    return <h1>Loading comic...</h1>
  }

  private handlePreviousComic(event: React.SyntheticEvent<HTMLButtonElement>) {
    const { currentPage } = this.props;
    if (currentPage > 0) {
      const prevComicPage = currentPage - 1;
      this.props.fetchPreviousComic(prevComicPage);
    }
  }

  private handleNextComic(event: React.SyntheticEvent<HTMLButtonElement>) {
    const { currentPage, maxPage } = this.props;
    if (currentPage < maxPage) {
      const nextComicPage = currentPage + 1;
      this.props.fetchNextComic(nextComicPage);
    }
  }
}

function mapStateToProps(state: IRootState): PropsFromState {
  return {
    currentComic: getCurrentComic(state),
    currentPage: getCurrentPage(state),
    maxPage: getMaxPage(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PropsFromDispatch {
  return bindActionCreators({
    fetchLatestComic: FetchLatestComic,
    fetchNextComic: FetchNextComic,
    fetchPreviousComic: FetchPreviousComic,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
