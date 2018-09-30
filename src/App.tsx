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
import FlexCol from './components/FlexCol';
import FlexRow from './components/FlexRow';

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
          <FlexCol id="Title_And_Date">
            <div className="title">{currentComic.safe_title}</div>
            <div className="date">Comic Date: {`${currentComic.month}/${currentComic.day}/${currentComic.year}`}</div>
          </FlexCol>
          <FlexRow id="Image_And_Controls">
            <div
              className="back"
              onClick={this.handlePreviousComic}
            >
              Previous
            </div>
            <img className="img" alt={currentComic.alt} src={currentComic.img} />
            <div
              className="next"
              onClick={this.handleNextComic}
            >
              Next
            </div>
          </FlexRow>
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
  display: flex;
  flex: 1;
  flex-direction: column;

  #Title_And_Date {
    align-items: center;
    justify-content: center;
    min-height: 120px;
  }

  #Image_And_Controls {
    position: relative;
    align-items: center;
    justify-content: center;
  }

  .img {
    width: 500px;
    height: 500px;
  }

  .back {
    height: 500px;
    width: 65px;
    display: ${(props) => props.currentPage === 1 ? "none" : "flex"};
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 75%;
    background-color: grey;
    opacity: 0;

    &:hover {
      opacity: .5;
      transition: opacity 0.2s ease-in;
      cursor: pointer;
    }
  }

  .next {
    height: 500px;
    width: 65px;
    display: ${(props) => props.currentPage === props.maxPage ? "none" : "flex"};
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 75%;
    background-color: grey;
    opacity: 0;

    &:hover {
      opacity: .5;
      transition: opacity 0.2s ease-in;
      cursor: pointer;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
