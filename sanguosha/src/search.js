'use strict';

let cards = {};

fetch("https://jeffr.ee/sanguosha/base.json")
  .then(r => r.json())
  .then(r => cards = {...cards, ...r})

//fetch("https://jeffr.ee/sanguosha/cards.json")
  //.then(r => r.json())
  //.then(r => cards = {...cards, ...r})

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  renderObject(id) {
    if (!cards[id]) {
      return <div />
    } else if (Array.isArray(cards[id])) {
      return (
        <div>
          {
            cards.map(renderObject)
          }
        </div>
      );
    } else if (typeof cards[id] === 'string' || cards[id] instanceof String) {
      return renderObject(cards[id]);
    } else {
      const { uuid, name, title, alignment, abilities, clarifications } = cards[id];
      return (
        <div style={{
          display: "flex",
          padding: "1em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <img src={`res/${uuid}.jpg`} style={{ height: "400px", padding: "0 1em" }} />
          <div style={{ height: "400px", padding: "0 1em", maxWidth: "500px" }} key={uuid}>
            {name && <h1>{name}</h1>}
            {title && <p>{title}</p>}
            {alignment && <p>Alignment: {alignment}</p>}
            {abilities && abilities.map(obj =>
              <div key={obj.title}>
                <h3>{obj.title}</h3>
                <p>{obj.text}</p>
              </div>)}
          </div>
        </div>
      );
    }
  }

  render() {
    const { id } = this.props;

    if (cards[id]) {
      return this.renderObject(id);
    } else if (id) {
      return (
        <center>
          <p>ID "{id}" not found</p>
        </center>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
    this.queryText = "";
  }

  updateQuery = (evt) => {
    this.queryText = evt.target.value;
  }

  handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      this.submit();
    }
  }

  submit = () => {
    const query = this.queryText
                    .replace(/\s/g, "")
                    .toLowerCase();

    this.setState({
      query: query,
    })
  }

  render() {
    const { state, props } = this;
    return (
      <div>
        <center>
          <img src="logo.png" width="40%" height="40%" />
          <div>
            <input type="search" id="query" name="query" value={this.state.queryText} style={{ width: "600px" }}
                   onChange={this.updateQuery} onKeyPress={this.handleKeyPress}/>
            <br /><p style={{ margin: "10px" }} />
            <div>
              <input type="button" id="search" value="Search" onClick={this.submit} />
              <input type="button" id="lucky" value="I'm Feeling Lucky" />
            </div>
          </div>
        </center>
        <Results id={state.query}/>
      </div>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Search />);

