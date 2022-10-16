'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cards = {};

fetch("https://jeffr.ee/sanguosha/base.json").then(function (r) {
  return r.json();
}).then(function (r) {
  return cards = Object.assign({}, cards, r);
});

//fetch("https://jeffr.ee/sanguosha/cards.json")
//.then(r => r.json())
//.then(r => cards = {...cards, ...r})

var Results = function (_React$Component) {
  _inherits(Results, _React$Component);

  function Results(props) {
    _classCallCheck(this, Results);

    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
  }

  _createClass(Results, [{
    key: 'renderObject',
    value: function renderObject(id) {
      if (!cards[id]) {
        return React.createElement('div', null);
      } else if (Array.isArray(cards[id])) {
        return React.createElement(
          'div',
          null,
          cards.map(this.renderObject)
        );
      } else if (typeof cards[id] === 'string' || cards[id] instanceof String) {
        return this.renderObject(cards[id]);
      } else {
        var _cards$id = cards[id],
            uuid = _cards$id.uuid,
            name = _cards$id.name,
            title = _cards$id.title,
            alignment = _cards$id.alignment,
            abilities = _cards$id.abilities,
            clarifications = _cards$id.clarifications;

        return React.createElement(
          'div',
          { style: {
              display: "flex",
              padding: "1em",
              flexWrap: "wrap",
              justifyContent: "center"
            } },
          React.createElement('img', { src: 'res/' + uuid + '.jpg', style: { height: "400px", padding: "0 1em" } }),
          React.createElement(
            'div',
            { style: { height: "400px", padding: "0 1em", maxWidth: "500px" }, key: uuid },
            name && React.createElement(
              'h1',
              null,
              name
            ),
            title && React.createElement(
              'p',
              null,
              title
            ),
            alignment && React.createElement(
              'p',
              null,
              'Alignment: ',
              alignment
            ),
            abilities && abilities.map(function (obj) {
              return React.createElement(
                'div',
                { key: obj.title },
                React.createElement(
                  'h3',
                  null,
                  obj.title
                ),
                React.createElement(
                  'p',
                  null,
                  obj.text
                )
              );
            })
          )
        );
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var id = this.props.id;


      if (cards[id]) {
        return this.renderObject(id);
      } else if (id) {
        return React.createElement(
          'center',
          null,
          React.createElement(
            'p',
            null,
            'ID "',
            id,
            '" not found'
          )
        );
      } else {
        return React.createElement('div', null);
      }
    }
  }]);

  return Results;
}(React.Component);

var Search = function (_React$Component2) {
  _inherits(Search, _React$Component2);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this2 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this2.updateQuery = function (evt) {
      _this2.queryText = evt.target.value;
    };

    _this2.handleKeyPress = function (evt) {
      if (evt.key === "Enter") {
        _this2.submit();
      }
    };

    _this2.submit = function () {
      var query = _this2.queryText.replace(/\s/g, "").toLowerCase();

      _this2.setState({
        query: query
      });
    };

    _this2.state = {
      query: ""
    };
    _this2.queryText = "";
    return _this2;
  }

  _createClass(Search, [{
    key: 'render',
    value: function render() {
      var state = this.state,
          props = this.props;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'center',
          null,
          React.createElement('img', { src: 'logo.png', width: '40%', height: '40%' }),
          React.createElement(
            'div',
            null,
            React.createElement('input', { type: 'search', id: 'query', name: 'query', value: this.state.queryText, style: { width: "600px" },
              onChange: this.updateQuery, onKeyPress: this.handleKeyPress }),
            React.createElement('br', null),
            React.createElement('p', { style: { margin: "10px" } }),
            React.createElement(
              'div',
              null,
              React.createElement('input', { type: 'button', id: 'search', value: 'Search', onClick: this.submit }),
              React.createElement('input', { type: 'button', id: 'lucky', value: 'I\'m Feeling Lucky' })
            )
          )
        ),
        React.createElement(Results, { id: state.query })
      );
    }
  }]);

  return Search;
}(React.Component);

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Search, null));