import React from 'react';

class Search extends React.Component {
  token = null;
  state = {
    query: "",
    items: []
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      query: value
    });

    this.search(value);
  };

  search = query => {
    const url = `http://localhost:9000/items/search?term=${query}`;
    const token = {};
    this.token = token;

    fetch(url)
      .then(results => results.json())
      .then(data => {
        if (this.token === token) {
          this.setState({ items: data.results });
        }
      });
  };

  componentDidMount() {
    this.search("");
  }

  render() {
    return (
      <form>
        <input
          type="text"
          className="search-box"
          placeholder="Search for..."
          onChange={this.onChange}
        />
        {this.state.items.map(item => (
          <ul key={item.ItemId}>
            <li>{item.ItemName}</li>
          </ul>
        ))}
      </form>
    );
  }
}