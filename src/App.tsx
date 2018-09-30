import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { IRootState } from './store/rootReducer';
import { getCurrentComic, getCurrentPage, getMaxPage } from './store/data-layer/comic/selectors';
import { FetchLatestComic } from './store/data-layer/comic/actions/FetchLatestComic';
import { ComicVM } from './models/view-models/ComicVM';
import { FetchNextComic } from './store/data-layer/comic/actions/FetchNextComic';
import { FetchPreviousComic } from './store/data-layer/comic/actions/FetchPreviousComic';

interface StyleProps {
  className?: string;
}

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

type Props = StyleProps & PropsFromState & PropsFromDispatch;

class App extends React.Component<Props> {

  constructor(props: Props) {
    super(props);

    this.props.fetchLatestComic(); // on app load, fetch latest comic

    this.handlePreviousComic = this.handlePreviousComic.bind(this);
    this.handleNextComic = this.handleNextComic.bind(this);
  }

  public render() {
    const { currentComic } = this.props;
    if (currentComic) {
      return (
        <div className={this.props.className}>
          <div className="title">{currentComic.safe_title}</div>
          <div className="date">Comic Date: {`${currentComic.month}/${currentComic.day}/${currentComic.year}`}</div>
          <div
            className="back"
            onClick={this.handlePreviousComic}
          >
            Previous
          </div>
          <div
            className="next"
            onClick={this.handleNextComic}
          >
            Next
          </div>
          <div className="img-wrapper">
            <img className="img" alt={currentComic.alt} src={currentComic.img} />
          </div>
        </div>
      );
    }
    return <h1>Loading comic...</h1>
  }

  private handlePreviousComic(event: React.SyntheticEvent<HTMLElement>) {
    const { currentPage } = this.props;
    if (currentPage > 0) {
      const prevComicPage = currentPage - 1;
      this.props.fetchPreviousComic(prevComicPage);
    }
  }

  private handleNextComic(event: React.SyntheticEvent<HTMLElement>) {
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

const styledApp = styled(App)`

`;

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
