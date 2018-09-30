import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { IRootState } from './store/rootReducer';
import { getCurrentComic, getCurrentPage, getMaxPage, isLoading } from './store/data-layer/comic/selectors';
import { FetchLatestComic } from './store/data-layer/comic/actions/FetchLatestComic';
import { ComicVM } from './models/view-models/ComicVM';
import FlexCol from './components/FlexCol';
import FlexRow from './components/FlexRow';
import { FetchSpecificComic } from './store/data-layer/comic/actions/FetchSpecificComic';
import { BarLoader } from 'react-spinners';

interface StyleProps {
  className?: string;
}

interface PropsFromState {
  currentComic: ComicVM | null;
  currentPage: number;
  maxPage: number;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchLatestComic: typeof FetchLatestComic;
  fetchSpecificComic: typeof FetchSpecificComic;
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
              {"<<<<"}
            </div>
            <img className="img" alt={currentComic.alt} src={currentComic.img} />
            <div
              className="next"
              onClick={this.handleNextComic}
            >
              {">>>>"}
            </div>
          </FlexRow>
          <FlexRow id="App_Author_Tag">
            <span>Made by Francisco:
              <a href="https://github.com/fgarcia-student" target="_blank">Github</a>|
              <a href="https://twitter.com/francisc0x5E" target="_blank">Twitter</a>
            </span>
          </FlexRow>
        </div>
      );
    }
    return (
      <div id="Loading" className={this.props.className}>
        <BarLoader loading={this.props.loading} />
        <FlexRow id="App_Author_Tag">
          <span>Made by Francisco:
            <a href="https://github.com/fgarcia-student" target="_blank">Github</a>|
            <a href="https://twitter.com/francisc0x5E" target="_blank">Twitter</a>
          </span>
        </FlexRow>
      </div>
    );
  }

  private handlePreviousComic(event: React.SyntheticEvent<HTMLElement>) {
    const { currentPage } = this.props;
    if (currentPage > 0) {
      const prevComicPage = currentPage - 1;
      this.props.fetchSpecificComic(prevComicPage);
    }
  }

  private handleNextComic(event: React.SyntheticEvent<HTMLElement>) {
    const { currentPage, maxPage } = this.props;
    if (currentPage < maxPage) {
      const nextComicPage = currentPage + 1;
      this.props.fetchSpecificComic(nextComicPage);
    }
  }
}

function mapStateToProps(state: IRootState): PropsFromState {
  return {
    currentComic: getCurrentComic(state),
    currentPage: getCurrentPage(state),
    maxPage: getMaxPage(state),
    loading: isLoading(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PropsFromDispatch {
  return bindActionCreators({
    fetchLatestComic: FetchLatestComic,
    fetchSpecificComic: FetchSpecificComic,
  }, dispatch);
}

const styledApp = styled(App)`
  display: flex;
  flex: 1;
  flex-direction: column;

  a {
    padding: 0 5px;
  }

  #Title_And_Date {
    align-items: center;
    justify-content: center;
    min-height: 80px;
  }

  #Image_And_Controls {
    position: relative;
    margin: 0 auto;
    width: 520px;
    height: 520px;
  }

  #App_Author_Tag {
    align-items: center;
    justify-content: center;
    height: 80px;
  }

  &#Loading {
    margin-top: 595px;
    align-items: center;
    justify-content: center;
  }

  .img {
    width: 500px;
    height: 500px;
    padding: 5px;
    border: 5px solid black;
  }

  .back {
    height: 500px;
    width: 65px;
    display: ${(props) => props.currentPage === 1 ? "none" : "flex"};
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    padding: 10px 0px;
    background-color: grey;
    opacity: 0.1;
    transition: opacity 0.2s ease-in;

    &:hover {
      opacity: .4;
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
    right: 0;
    padding: 10px 0px;
    background-color: grey;
    opacity: 0.1;
    transition: opacity 0.2s ease-in;

    &:hover {
      opacity: .4;
      transition: opacity 0.2s ease-in;
      cursor: pointer;
    }
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
