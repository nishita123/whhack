import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { connect } from 'react-redux'

const MovieListContainerImpl = React.createClass({
  render() {
    return (
      <BootstrapTable trClassName="movie-list-tr" hover={true} condensed={true} data={this.props.movies} search={true}>
        <TableHeaderColumn dataAlign='center' dataField='Title' dataFormat={this.formatTitle} isKey={true}>Title</TableHeaderColumn>
        <TableHeaderColumn
          dataAlign='center'
          dataField='imdbRating'
          dataSort={true}
          dataFormat={this.formatRating}
          sortFunc={this.sortRating}
        >
          Rating
        </TableHeaderColumn>
        <TableHeaderColumn dataAlign='center' dataField='Released'>Released</TableHeaderColumn>
        <TableHeaderColumn dataAlign='center' dataField='Genre'>Genre</TableHeaderColumn>
        <TableHeaderColumn dataAlign='center' dataField='Runtime'>Runtime</TableHeaderColumn>
        <TableHeaderColumn dataAlign='center' dataField='Plot'>Plot</TableHeaderColumn>
      </BootstrapTable>
    )
  },
  formatTitle(cell, row) {
    return (
      <a href={`http://www.imdb.com/title/${row['imdbID']}`} target="_blank">
        <img width={100} src={row['Poster']}/>
        <div><strong>{row['Title']}</strong></div>
      </a>
    )
  },
  formatRating(cell, row) {
    return (
      <div>
        <p>IMDB: {row['imdbRating']} <br/> <span className="small">{row['imdbVotes']} votes</span></p>
        <p>Metascore: {row['Metascore']}</p>
        <p>Awards: {row['Awards']}</p>
      </div>
    )
  },
  sortRating(a, b, order) {
    let diff = Number(a['imdbRating']) - Number(b['imdbRating'])
    if (order == 'desc') {
      return -diff
    } else {
      return diff
    }
  }
});

const mapStateToProps = (state) => {
  return {
    movies: state.displayList
      .map(name => state.movies[name])
      .filter(item => item != undefined)
  }
}

export default connect(mapStateToProps)(MovieListContainerImpl)
